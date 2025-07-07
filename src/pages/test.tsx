import React, { useState, useRef, useCallback } from "react"
import { Image, Upload, X, RotateCcw } from "lucide-react"

interface PhotoFile {
  file: File
  url: string
  name: string
  size: number
}

interface PhotoSelectorProps {
  onPhotoSelect?: (file: File) => void
  onUploadSuccess?: (response: any) => void
  onUploadError?: (error: Error) => void
  maxFileSize?: number // in bytes
  acceptedTypes?: string[]
  apiEndpoint?: string
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({
  onPhotoSelect,
  onUploadSuccess,
  onUploadError,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  apiEndpoint = "/api/upload-photo",
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoFile | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedTypes.includes(file.type)) {
        return `Please select a valid image file (${acceptedTypes.join(", ")})`
      }

      if (file.size > maxFileSize) {
        return `File size must be less than ${Math.round(
          maxFileSize / (1024 * 1024)
        )}MB`
      }

      return null
    },
    [acceptedTypes, maxFileSize]
  )

  const handleFileSelect = useCallback(
    (file: File) => {
      const validationError = validateFile(file)

      if (validationError) {
        setError(validationError)
        return
      }

      setError("")
      const photoFile: PhotoFile = {
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }

      setSelectedPhoto(photoFile)
      onPhotoSelect?.(file)
    },
    [validateFile, onPhotoSelect]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect]
  )

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragOver(true)
    },
    []
  )

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragOver(false)
    },
    []
  )

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragOver(false)

      const file = event.dataTransfer.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect]
  )

  const openFileSelector = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const removePhoto = useCallback(() => {
    if (selectedPhoto) {
      URL.revokeObjectURL(selectedPhoto.url)
      setSelectedPhoto(null)
    }
    setError("")

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [selectedPhoto])

  const uploadPhoto = useCallback(async () => {
    if (!selectedPhoto) return

    try {
      setIsUploading(true)
      setError("")

      const formData = new FormData()
      formData.append("photo", selectedPhoto.file)
      formData.append("filename", selectedPhoto.name)

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`
        )
      }

      const result = await response.json()
      console.log("Photo uploaded successfully:", result)

      onUploadSuccess?.(result)

      // Reset after successful upload
      removePhoto()
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Upload failed")
      console.error("Upload error:", error)
      setError(error.message)
      onUploadError?.(error)
    } finally {
      setIsUploading(false)
    }
  }, [selectedPhoto, apiEndpoint, onUploadSuccess, onUploadError, removePhoto])

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }, [])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (selectedPhoto) {
        URL.revokeObjectURL(selectedPhoto.url)
      }
    }
  }, [selectedPhoto])

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleInputChange}
        className="hidden"
        capture="environment" // Suggests camera on mobile
      />

      {/* Photo Preview */}
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

          {/* Photo Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 rounded-b-lg">
            <p className="text-sm truncate">{selectedPhoto.name}</p>
            <p className="text-xs text-gray-300">
              {formatFileSize(selectedPhoto.size)}
            </p>
          </div>
        </div>
      )}

      {/* Upload/Select Actions */}
      {selectedPhoto ? (
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
            onClick={uploadPhoto}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={isUploading}
          >
            <Upload className="w-4 h-4" />
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      ) : (
        /* File Selector */
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
            ${
              isDragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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
              <p className="text-sm text-gray-600 mb-4">
                Choose from your gallery or drag and drop
              </p>
              <button
                type="button"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium"
              >
                Browse Photos
              </button>
            </div>
          </div>

          {/* Format Info */}
          <div className="mt-4 text-xs text-gray-500">
            <p>Supported formats: {acceptedTypes.join(", ")}</p>
            <p>Max size: {Math.round(maxFileSize / (1024 * 1024))}MB</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  )
}

export default PhotoSelector
