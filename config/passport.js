const KakaoStrategy = require('passport-kakao').Strategy;
const { Users } = require('../models');

module.exports = (app) => (passport) => {
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Serialize
   */
  passport.serializeUser((user, done) => {
    // console.log('serialize user', user);
    done(null, user); // user 객체가 deseriallizeUser로 전달
  });

  /**
   * Deserialize
   */
  passport.deserializeUser((user, done) => {
    // console.log('deserialize user', user);
    done(null, user); // 여기서 전달되는 user 가 req.user
  });

  /**
   * Kakao Strategy
   */
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env['KAKAO_CLIENT_ID'],
        callbackURL: process.env['KAKAO_CALLBACK'],
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile._json.kakao_account.email;
        try {
          const exUser = await Users.findOne({
            where: {
              snsId: profile.id,
              provider: 'kakao',
            },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await Users.create({
              email: email,
              name: profile.displayName,
              imageProfile: profile._json.properties.profile_image,
              snsId: profile.id,
              provider: 'kakao',
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
