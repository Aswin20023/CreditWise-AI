import { useDropzone } from "react-dropzone";

export default function UploadCard({
  file,
  setFile,
  onPredict,
  loading,
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
      >
        <input {...getInputProps()} />

        <h3 className="text-lg font-semibold">
          {isDragActive
            ? "Drop your CSV here..."
            : "Drag & Drop CSV File"}
        </h3>

        <p className="text-gray-500 mt-2">
          or click to browse
        </p>
      </div>

      {file && (
        <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-medium text-green-700">
            Selected File
          </p>

          <p className="text-gray-700 mt-1">
            {file.name}
          </p>

          <p className="text-sm text-gray-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      <button
        onClick={onPredict}
        disabled={!file || loading}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Predicting..." : "Predict Customers"}
      </button>

    </div>
  );
}