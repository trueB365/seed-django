import React from 'react';

interface FloatingNavigationProps {
  className?: string;
  isOpen?: boolean;
}

const FloatingNavigation: React.FC<FloatingNavigationProps> = ({ className, isOpen }: FloatingNavigationProps) => {
  return (
    <div className={isOpen ? 'fixed z-50 bottom-0 top-0 right-0 left-0' : 'hidden'}>
      <ul className={className}>
            <li className="w-full">
              <a className="flex text-main-white-light py-2 px-3 hoover:bg-main-white-lighter hover:rounded" href="#">
                <span className="mr-4">
                   <svg viewBox="0 0 16 16" width="1.5em" height="1.5em" focusable="false" role="img" aria-label="house"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi-house b-icon bi">
                        <g>
                            <path fillRule="evenodd"
                                d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"></path>
                            <path fillRule="evenodd"
                                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"></path>
                        </g>
                    </svg>
                </span>
                <span>Home</span>
                </a>
            </li>
            <li className="w-full">
              <a className="flex text-main-white-light py-2 px-3" href="#">
                <span className="mr-4">
                  <svg viewBox="0 0 16 16" width="1.5em" height="1.5em" focusable="false" role="img" aria-label="clipboard check"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi-clipboard-check b-icon bi">
                        <g>
                            <path fillRule="evenodd"
                                d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
                            <path
                                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
                            <path
                                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
                        </g>
                    </svg>
                </span>
                <span>BookMark</span>
              </a>
            </li>
            <li className="w-full">
              <a className="flex text-main-white-light py-2 px-3" href="#">
                <span className="mr-4">
                  <svg viewBox="0 0 16 16" width="1.5em" height="1.5em" focusable="false" role="img" aria-label="bookmarks"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi-bookmarks b-icon bi">
                        <g>
                            <path
                                d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"></path>
                            <path
                                d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"></path>
                        </g>
                    </svg>
                </span>
                <span>BookMark</span>
              </a>
            </li>
            <li className="w-full">
              <a className="flex text-main-white-light py-2 px-3" href="#">
                <span className="mr-4">
                  <svg viewBox="0 0 16 16" width="1.5em" height="1.5em" focusable="false" role="img" aria-label="heart"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi-heart b-icon bi">
                        <g>
                            <path
                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                        </g>
                    </svg>
                </span>
                <span>Likes</span>
              </a>
            </li>
            <li className="w-full">
              <a className="flex text-main-white-light py-2 px-3" href="#">
                <span className="mr-4">
                  <svg viewBox="0 0 16 16" width="1.5em" height="1.5em" focusable="false" role="img" aria-label="clock"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi-clock b-icon bi">
                        <g>
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"></path>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"></path>
                        </g>
                    </svg>
                </span>
                <span>Recently</span>
              </a>
            </li>
          </ul>
    </div>
  )
}

export default FloatingNavigation;