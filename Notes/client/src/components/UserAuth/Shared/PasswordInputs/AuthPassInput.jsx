import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function AuthPassInput() {
  return (
    <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-white"
            >
              Password
            </label>
          </div>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {/* <FaEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" /> */}
            <FaEyeSlash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
          </div>
        </div>

  )
}
