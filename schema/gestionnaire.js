const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gestionnaireSchema = new Schema({
  fullname:  String,
  numeros: Schema.Types.Mixed,
});

gestionnaireSchema.statics = {
  async getByFullname(fullname) {
    const regexNonSensitive = new RegExp(["^", fullname, "$"].join(""), "i")

    return await this.find({ fullname: regexNonSensitive })
  }
}

module.exports = mongoose.model('Gestionnaire', gestionnaireSchema);
