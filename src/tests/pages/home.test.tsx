import Home from '@/pages'
import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

describe('Home page test', () => {
  it('Should Hello World', () => {
    const { getByText } = render(<Home />)

    expect(getByText('Hello World')).toBeInTheDocument()
  })
})
