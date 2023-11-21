const Navigation = () => (<>
    <nav className="text-liwhite border-b-[0.2px] border-b-main-white-lighter">
        <div className="relative items-center flex flex-2 flex-row w-full">
            <div className="text-[2em] ml-[1em]">beeg</div>
            <div className="grow"></div>
            <div className="flex flex-row gap-2 mr-[3.4em]">
                <button className="border rounded-[50%] mt-[1em]">
                    <span>
                        <svg viewBox="0 0 24 24" width="2em" height="2em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </svg>
                    </span>
                </button>
                <button className="border rounded-[50%] mt-[1em]">
                    <span>
                        <svg viewBox="0 0 24 24" width="2em" height="2em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
                            <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </nav>
</>)

export default Navigation;
