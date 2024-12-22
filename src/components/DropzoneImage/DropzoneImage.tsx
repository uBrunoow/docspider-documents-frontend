import { Link as LinkIcon, Trash } from 'lucide-react'
import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

interface FileWithPreview extends File {
  preview?: string
}

interface IDropzoneComponentProps {
  initialImage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
  name: string
  label: string
}

const DropzoneComponent: React.FC<IDropzoneComponentProps> = ({
  initialImage,
  form,
  name,
  label,
}) => {
  const [file, setFile] = useState<FileWithPreview | null>(() => {
    if (initialImage) {
      const isPdf = initialImage.endsWith('.pdf')
      return {
        preview: initialImage,
        type: isPdf ? 'application/pdf' : 'image/*',
      } as FileWithPreview
    }
    return null
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const acceptedFile = acceptedFiles[0]
      const fileWithPreview = Object.assign(acceptedFile, {
        preview:
          acceptedFile.type.includes('image') ||
          acceptedFile.type === 'application/pdf'
            ? URL.createObjectURL(acceptedFile)
            : undefined,
      })

      setFile(fileWithPreview as FileWithPreview)
      form.setValue(name, acceptedFile.name)
      form.setValue('filename', acceptedFile.name)
    },
    [form, name],
  )

  const handleRemoveFile = () => {
    setFile(null)
    form.setValue(name, null)
    form.setValue('filename', null)
  }

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
    maxFiles: 1,
  }

  useEffect(() => {
    if (file) {
      form.setValue(name, file.preview)
    } else if (initialImage) {
      form.setValue(name, initialImage)
    } else {
      form.setValue(name, null)
    }
  }, [file, form, name, initialImage])

  useEffect(() => {
    if (form.formState.isSubmitting) {
      if (form.formState.isSubmitSuccessful) {
        setFile(null)
        form.setValue(name, null)
      }
    }
  }, [
    form.formState.isSubmitSuccessful,
    form.formState.isSubmitting,
    form,
    name,
  ])

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions)

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex w-full flex-col">
              <div
                {...getRootProps()}
                className={`w-full border-[3px] border-dashed ${form.formState.errors[name] ? 'border-red-500' : 'border-zinc-700/20'}   p-5 text-center`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Solte o arquivo aqui ...</p>
                ) : (
                  <>
                    {file ? (
                      <div style={{ marginTop: '20px' }}>
                        <div className="flex flex-col items-center gap-2">
                          {file.type === 'application/pdf' ? (
                            <iframe
                              src={file.preview}
                              width="100%"
                              height="500px"
                            ></iframe>
                          ) : (
                            <img
                              src={file.preview}
                              className="h-full max-h-[500px] w-full object-contain"
                              alt="Preview"
                            />
                          )}

                          <div className="flex flex-row gap-5">
                            <Button
                              type="button"
                              onClick={handleRemoveFile}
                              className="flex w-[150px] flex-row gap-2 bg-red-500 text-white hover:bg-red-600"
                            >
                              <Trash />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-[120px] select-none flex-row items-center justify-center gap-5 text-zinc-500">
                        <LinkIcon
                          className={` ${form.formState.errors[name] ? 'text-red-500' : ''} `}
                        />
                        <p
                          className={` ${form.formState.errors[name] ? 'text-red-500' : ''} `}
                        >
                          Arraste ou insira o documento aqui
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DropzoneComponent
