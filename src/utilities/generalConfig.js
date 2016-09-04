
import DOMPurify from 'dompurify'

export const renderIntroText = (config) => {
  if (config['intro-text'].length > 0) {
    return {
      __html: DOMPurify.sanitize(config['intro-text'])
    }
  }
  return {
    __html: ''
  }
}

export const renderTitleRight = (config) => {
  if (config['header-right-text'].length > 0) {
    return (config['header-right-text'])
  }
  return ''
}

export const renderFooterRight = (config) => {
  if (config['footer-right-text'].length > 0) {
    return (config['footer-right-text'])
  }
  return ''
}
