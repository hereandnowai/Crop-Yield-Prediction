
import React, { useState, useCallback, useRef } from 'react';
import { CameraIcon, UploadIcon } from './Icons';

interface ImageUploadProps {
  image: { base64: string; mimeType: string } | null;
  onImageChange: (image: { base64: string; mimeType: string } | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ image, onImageChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        onImageChange({ base64: base64String, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onImageChange]);

  const onButtonClick = () => {
      fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="font-semibold text-lg flex items-center mb-4 text-gray-700">
        <CameraIcon className="w-6 h-6 mr-3 text-purple-500" />Satellite Image
      </h3>
      <label
        htmlFor="file-upload"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors
        ${dragOver ? 'border-green-500 bg-green-50' : 'border-gray-300'}
        ${image ? 'border-green-500' : ''}
        `}
      >
        <div className="space-y-1 text-center py-4">
          {image ? (
            <div>
                <img src={`data:${image.mimeType};base64,${image.base64}`} alt="Satellite preview" className="mx-auto h-32 w-auto rounded-md object-cover" />
                <p className="text-sm text-green-600 font-semibold mt-4">Image loaded successfully!</p>
                <p className="text-xs text-gray-500">Click or drag to replace</p>
            </div>
          ) : (
            <>
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <p className="pl-1">Drag & drop an image, or</p>
              </div>
              <button type="button" onClick={onButtonClick} className="font-medium text-green-600 hover:text-green-500">
                browse your files
              </button>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </>
          )}
        </div>
        <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e.target.files)} accept="image/*" />
      </label>
    </div>
  );
};

export default ImageUpload;
