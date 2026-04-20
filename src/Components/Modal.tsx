import React, { type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // ✅ Do not render if closed
  if (!isOpen) return null;

  return (
    // ✅ Overlay (clicking this closes modal)
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      
      {/* ✅ White modal box (click inside does NOT close) */}
      <div
        className="bg-white rounded-2xl shadow-xl p-6 min-w-[300px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ❌ Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg font-bold"
        >
          ×
        </button>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;