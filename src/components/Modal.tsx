"use client";

import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  icon?: string; 
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, icon, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-8 relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </button>
        {icon && (
          <div className="flex justify-center mb-4">
            <img src={icon} alt="Icon" className="h-24 w-24" />
          </div>
        )}

        {title && (
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            {title}
          </h2>
        )}
        <div className="text-gray-600 text-center">{children}</div>
      </div>
    </div>
  );
}

