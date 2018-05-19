const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../../utils/config');

module.exports = {
  login: async (_, { someUserIDThing }, { mongo: { Users }, res }) => {
    /**
     * Query to log user in
     * ~ Takes in user information from twitter
     * ~ Generates JWT
     * ~ Sets JWT in express res header
     * ~ Verifies user information in db
     *
     * @param {object} _ unused
     * @param {object} someUserIDTHING whatever comes back from twitter
     * @param {object} Users mongodb collection
     * @param {object} res express res object
     * @returns {object} user information
     */

    const user = Users.findOne({ twitterId: someUserIDThing }).catch(err => { throw err; });
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '2d' });
    const expDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 2));
    res.cookie('pinterestClone', token, { httpOnly: true, expires: expDate });
    return { user, status: true };
  }
};
