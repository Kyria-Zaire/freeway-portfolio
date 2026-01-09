/**
 * IMORIA Portfolio - Expérience Kindle-Like
 * 
 * ZÉRO MARGE - Le livre EST l'application
 */

import { Book, PageComponent } from './components'
import { useState } from 'react'
import { 
  PageFrontCover,
  PageCover, 
  PageExperience, 
  PageEducation, 
  PageSkills,
  PageProjects,
  PageContact,
  PageEndCover
} from './components/pages'

const TOTAL_PAGES = 8

function App() {
  return (
    <Book>
      {/* Couverture du livre fermé */}
      <PageComponent>
        <PageFrontCover />
      </PageComponent>

      <PageComponent pageNumber={1} totalPages={TOTAL_PAGES - 1}>
        <PageCover />
      </PageComponent>

      <PageComponent pageNumber={2} totalPages={TOTAL_PAGES - 1}>
        <PageExperience />
      </PageComponent>

      <PageComponent pageNumber={3} totalPages={TOTAL_PAGES - 1}>
        <PageEducation />
      </PageComponent>

      <PageComponent pageNumber={4} totalPages={TOTAL_PAGES - 1}>
        <PageSkills />
      </PageComponent>

      <PageComponent pageNumber={5} totalPages={TOTAL_PAGES - 1}>
        <PageProjects />
      </PageComponent>

      <PageComponent pageNumber={6} totalPages={TOTAL_PAGES - 1}>
        <PageContact />
      </PageComponent>

      <PageComponent pageNumber={7} totalPages={TOTAL_PAGES - 1}>
        <PageEndCover />
      </PageComponent>
    </Book>
  )
}

export default App
