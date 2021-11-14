
const conf = {
  Local: {
    und: {
      Voice: {
        Default: {
          Sarah: {
            Voice: {
              gender: "female"
            },
            discount: 5
          },
          Scott: {
            Voice: {
              gender: "male"
            },
            discount: 1,
            manager: "Sarah"
          }
        }
      }
    }
  },
  Setting: {
    Voice: {
      Default: "Scott"
    }
  }
}

const Multivocal = require('multivocal');
exports.init = function(){
  new Multivocal.Config.Simple( conf );
}