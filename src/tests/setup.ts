import '@testing-library/jest-dom/vitest'   // ✅ auto-registers matchers for Vitest
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => cleanup())
