import './App.css'
import Navbar    from './components/Navbar/Navbar'
import Hero      from './components/Hero/Hero'
import About     from './components/About/About'
import Experience from './components/Experience/Experience'
import Projects  from './components/Projects/Projects'
import Education from './components/Education/Education'
import Contact   from './components/Contact/Contact'
import Footer    from './components/Footer/Footer'
import CustomCursor            from './components/global/CustomCursor'
import Terminal                from './components/global/Terminal'
import TrainingProgressSidebar from './components/global/TrainingProgressSidebar'
import DataStreamDivider       from './components/global/DataStreamDivider'

export default function App() {
  return (
    <>
      <CustomCursor />
      <Terminal />
      <TrainingProgressSidebar />

      <Navbar />

      <main>
        <Hero />
        <DataStreamDivider />
        <About />
        <DataStreamDivider reverse />
        <Experience />
        <DataStreamDivider />
        <Projects />
        <DataStreamDivider reverse />
        <Education />
        <DataStreamDivider />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
