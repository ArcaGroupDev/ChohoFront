const middleware = {}

middleware['redirect-login'] = require('../middleware/redirect-login.js')
middleware['redirect-login'] = middleware['redirect-login'].default || middleware['redirect-login']

export default middleware
