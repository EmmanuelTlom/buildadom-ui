/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

  import React, { useCallback, useState } from 'react'
  import { useDropzone } from 'react-dropzone'
  import { toast } from 'react-toastify'
  import { useRouter } from 'next/router'
import { useGetValidationDetailsQuery, useImageUploadMutation } from '@/redux/services/validation.service'
import Button from '@/ui/button/Button'
  
  function IdUpload() {
    const { data } = useGetValidationDetailsQuery()
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const onDrop = useCallback((acceptedFiles: any[]) => {
      const uploadedImage = acceptedFiles[0]
      if (!uploadedImage) return
      setFile(uploadedImage)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: false,
    })
  
    const [imageUpload, { isLoading }] = useImageUploadMutation()
  
    const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      if (!file) return toast.error('select a file')
      const formData = new FormData()
      formData.append('model', 'identification')
      formData.append('model_id', data && data.id)
      formData.append('role', 'main')
      formData.append('image', file)
  
      try {
        const response = await imageUpload(formData)
        if (response) toast.success('ID uploaded successfully')
        router.push('/seller/dashboard/create-store')
      } catch (error) {
        console.log(error)
      }
    }
  
    return (
      <form
        onSubmit={handleSubmit}
        className="mb-3 max-w-[600px] mx-auto flex flex-col"
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="border-gray-300 border-dashed border-2 flex items-center justify-center flex-col mt-4 rounded-[12px] h-[250px]">
            <i className="ri-upload-cloud-2-line text-blue-500 text-3xl"></i>
            <p className="font-poppins py-4 text-gray-500">
              Drag and drop your file(s) or <span>browse to upload</span>
            </p>
            <p className="font-poppins  text-gray-700">{file && file.name}</p>
          </div>
        </div>
        <Button
          classNames="mb-3 mt-6 py-4 w-[80%] rounded-[10px] mx-auto"
          title={isLoading ? 'uploading...' : 'Upload Valid Id'}
        />
      </form>
    )
  }
  
  export default IdUpload
  