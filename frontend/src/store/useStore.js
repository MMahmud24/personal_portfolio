import { create } from 'zustand'

const useStore = create((set) => ({
  terminalOpen: false,
  activeSection: 'hero',
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
}))

export default useStore
