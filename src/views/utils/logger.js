const logger = {
  trace: (message?: any, ...optionalParams: any[]) => {
    if (__DEV__ && typeof atob !== 'undefined') {
      console.trace('%cTRACE%c', 'color: #9E9E9E; font-weight: bold', '', message, ...optionalParams)
    }
  },
  debug: (message?: any, ...optionalParams: any[]) => {
    if (__DEV__ && typeof atob !== 'undefined') {
      console.debug('%cDEBUG%c', 'color: #4CAF50; font-weight: bold', '', message, ...optionalParams)
    }
  },
  info: (message?: any, ...optionalParams: any[]) => {
    if (__DEV__ && typeof atob !== 'undefined') {
      console.log('%cINFO%c', 'color: #2196F3; font-weight: bold', '', message, ...optionalParams)
    }
  },
  warn: (message?: any, ...optionalParams: any[]) => {
    if (__DEV__ && typeof atob !== 'undefined') {
      console.warn('%cWARN%c', 'color: #FF9800; font-weight: bold', '', message, ...optionalParams)
    }
  },
  error: (message?: any, ...optionalParams: any[]) => {
    if (__DEV__ && typeof atob !== 'undefined') {
      console.error('%cERROR%c', 'color: #F44336; font-weight: bold', '', message, ...optionalParams)
    }
  },
};

export default logger;