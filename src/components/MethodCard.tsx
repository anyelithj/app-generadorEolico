"use client";
import React, { useState } from "react";
import Modal from "./Modal";

type Props = {
  title: string;
  description: string;
  icon?: string;
  content?: string; 
};

export default function MethodCard({ title, description, icon, content }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center 
                   cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 
                   border border-gray-200 min-h-[240px]"
      >
        {icon && (
          <img
            src={icon}
            alt={`${title} icon`}
            className="h-24 w-24 mb-4"
          />
        )}
        <h4 className="font-semibold text-xl text-gray-800 mb-2 text-center">
          {title}
        </h4>
        <p className="text-base text-gray-600 text-center leading-relaxed">
          {description}
        </p>
      </article>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={title} icon={icon}>
        <p className="text-lg leading-relaxed">{content ?? description}</p>
      </Modal>
    </>
  );
}
