/* eslint-disable react/prop-types */

export default function SuccessAlert({ label1, label2 }) {
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
      <p className="text-lg font-semibold">{label1}</p>
      <p>{label2}</p>
    </div>
  );
}
