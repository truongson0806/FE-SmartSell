import { createContext, useContext, useState } from 'react'

const LoadingContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                showLoading: () => setIsLoading(true),
                hideLoading: () => setIsLoading(false),
            }}
        >
            {isLoading && <LoadingOverlay />}
            {children}
        </LoadingContext.Provider>
    )
}

const LoadingOverlay = () => (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900/50 z-50">
        <div className="bg-white px-4 py-2 rounded shadow-lg">
            <p className="text-lg font-semibold">Đang tải...</p>
        </div>
    </div>
)