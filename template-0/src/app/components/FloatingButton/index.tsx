import React from 'react';

interface FloatingButtonProps {
  onToggle: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onToggle }: FloatingButtonProps) => {
  return (
    <a className="fixed z-40 bottom-5 right-2" onClick={(e) => onToggle(e) }>
      <div className="floating-button grid justify-center items-center rounded-[50%] w-[3em] h-[3em] border">
        <svg className="p-2" viewBox="0 0 16 16" width="2.5em" height="2.5em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
        </svg>
      </div>
    </a>
  )
}

export default FloatingButton;