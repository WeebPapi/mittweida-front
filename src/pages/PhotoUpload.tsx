import React, { useState, useRef, useEffect } from "react"
import { Image, Upload, X, RotateCcw } from "lucide-react"
import { uploadPhoto } from "@/api/group.actions"
import { getGroupOfUser } from "@/api/auth.actions"
import { useNavigate } from "react-router"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhotoFile {
  file: File
  url: string
  size: number
}

const PhotoSelector: React.FC = () => {
  const group = getGroupOfUser()
  const navigate = useNavigate()
  if (!group || group.error) navigate(-1)

  const [groupId, setGroupId] = useState<string>(group?.data?.id!)
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoFile | null>(null)
  const [caption, setCaption] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [maxFileSize] = useState<number>(5 * 1024 * 1024)
  const [acceptedTypes] = useState<string[]>([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (group?.data) setGroupId(group.data.id)
  }, [group?.data])

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `image type is not valid, it should be: (${acceptedTypes.join(
        ", "
      )})`
    }

    if (file.size > maxFileSize) {
      return "file is too big, select a smaller picture"
    }
    return null
  }

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file)

    if (validationError) {
      setError(validationError)
      return
    }

    setError("")
    const photoFile: PhotoFile = {
      file,
      url: URL.createObjectURL(file),

      size: file.size,
    }
    setSelectedPhoto(photoFile)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  const removePhoto = () => {
    if (selectedPhoto) {
      URL.revokeObjectURL(selectedPhoto.url)
      setSelectedPhoto(null)
    }
    setError("")

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const photoUpload = async () => {
    if (!selectedPhoto) return

    try {
      setIsUploading(true)
      setError("")

      const response = await uploadPhoto(
        selectedPhoto.file,
        groupId,
        caption.trim(),
        location.trim()
      )

      if (response.status >= 400 && response.status < 500) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`
        )
      }

      console.log("Photo uploaded successfully:", response.data)

      removePhoto()
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Upload failed")
      console.error("Upload error:", error)
      setError(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  React.useEffect(() => {
    return () => {
      if (selectedPhoto) {
        URL.revokeObjectURL(selectedPhoto.url)
      }
    }
  }, [selectedPhoto])

  return (
    <main className="max-w-md mx-auto p-app mt-24 bg-white rounded-lg shadow-lg">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleInputChange}
        className="hidden"
      />

      {selectedPhoto && (
        <div className="relative mb-4">
          <img
            src={selectedPhoto.url}
            alt="Selected"
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />

          <button
            onClick={removePhoto}
            className="absolute top-2 right-2 p-2 bg-red-500 bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
            disabled={isUploading}
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 rounded-b-lg">
            <p className="text-xs text-gray-300">
              {formatFileSize(selectedPhoto.size)}
            </p>
          </div>
        </div>
      )}

      {selectedPhoto ? (
        <div className="flex flex-col gap-3">
          <Label htmlFor="caption">Caption (optional)</Label>
          <Input
            name="caption"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Label htmlFor="location">Location (optional)</Label>
          <Input
            name="location"
            placeholder="Location of image"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="flex gap-3">
            <button
              onClick={removePhoto}
              className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
              disabled={isUploading}
            >
              <RotateCcw className="w-4 h-4" />
              Change Photo
            </button>
            <button
              className="flex-1 px-4 py-3 bg-primary-indigo text-white rounded-lg hover:bg-dark-primary-indigo transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isUploading}
              onClick={() => {
                photoUpload()
              }}
            >
              <Upload className="w-4 h-4" />
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      ) : (
        <div
          className="relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer"
          onClick={openFileSelector}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 bg-gray-100 rounded-full">
              <Image className="w-12 h-12 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Select a Photo
              </h3>

              <button
                type="button"
                className="px-6 py-3 bg-primary-indigo text-white rounded-lg hover:bg-dark-primary-indigo transition-all font-medium"
              >
                Browse Photos
              </button>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>Supported formats: {acceptedTypes.join(", ")}</p>
            <p>Max size: {Math.round(maxFileSize / (1024 * 1024))}MB</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
    </main>
  )
}

export default PhotoSelector
