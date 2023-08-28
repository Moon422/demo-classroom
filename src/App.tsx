import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CoursePage } from './pages/CoursePage'
import { SlidingSidebar } from './components/shared/slide-sidebar'
import { createContext, useState } from 'react'
import { User, UserTypes } from './models'

export const SidebarContext = createContext<{ showSidebar: boolean, toggleSidebar: () => void } | null>(null)
export const LoggedInUser = createContext<User | null>(null)

function App() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="bg-white">
      <div className={`h-screen w-full absolute bg-black bg-opacity-40 z-50 ${showSidebar ? "block" : "hidden"}`} onClick={e => {
        e.preventDefault()
        setShowSidebar((showSidebar) => !showSidebar)
      }}>
        <SlidingSidebar />
      </div>
      <SidebarContext.Provider value={{ showSidebar, toggleSidebar: () => setShowSidebar((showSidebar) => !showSidebar) }}>
        <LoggedInUser.Provider value={new User(1, "Mahfuzur", "Rahman", UserTypes.STUDENT)}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/course/:id" element={<CoursePage />} />
            </Routes>
          </BrowserRouter>
        </LoggedInUser.Provider>
      </SidebarContext.Provider>
    </div >
  )
}

export default App
