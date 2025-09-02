import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Portfolio from '../app/Portfolio'

describe('Portfolio', () => {
  it('renders the hero headline', () => {
    render(<Portfolio />)
    expect(screen.getByText(/Hi, I’m/i)).toBeInTheDocument()
  })

  it('shows navbar items', () => {
    render(<Portfolio />)
    for (const label of ['Home','About','Skills','Projects','Experience','Education','Certifications','Achievements','Contact']) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('renders Featured Projects section', () => {
    render(<Portfolio />)
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
  })

  it('falls back to initials avatar when no PROFILE_IMG is set', () => {
    render(<Portfolio />)
    expect(screen.getByLabelText('Profile placeholder')).toHaveTextContent('CA')
  })

  it('renders Online Certifications section and a known certificate title', () => {
    render(<Portfolio />)
    expect(screen.getByText('Online Certifications')).toBeInTheDocument()
    expect(screen.getByText('React – The Complete Guide')).toBeInTheDocument()
  })
})
