const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NB_PAGE_BY_DEFAULT = 1
const NB_CLIENT_BY_DEFAULT = 10

// defini la limite du nombre de clients ou page demandé pour eviter le crash
const NB_MAX = 100000

const clientSchema = new Schema({
  fullname: String,
  email: String,
  email2: String,
  telDomicile: String,
  telPro: String,
  telMobile: String,
  telMobile2: String,
  fax: String,
  sexe: String,
});

clientSchema.statics = {
  async getAll(nbPage, nbClients) {
    let pageNumber = parseInt(nbPage)
    let numberOfClient = parseInt(nbClients)

    if (pageNumber > NB_MAX || pageNumber < 1 || !pageNumber)
      pageNumber = NB_PAGE_BY_DEFAULT
    if (numberOfClient > NB_MAX || numberOfClient < 1 || !numberOfClient)
      numberOfClient = NB_CLIENT_BY_DEFAULT

    const clients = await this.aggregate([
      { $skip: pageNumber === 1 ? 0 : parseInt(pageNumber * numberOfClient )},
      { $limit : numberOfClient },
      {
        $lookup: {
          from: 'lots',
          localField: '_id',
          foreignField: 'client',
          as: 'lots'
        }
      }, {
        $project: {
          fullname: 1,
          email: 1,
          numberOfLots: { $size: '$lots' }
        }
      }
  ])
    parseInt(pageNumber * numberOfClient)
    return {
      page: pageNumber,
      numberOfResult: clients.length,
      clients
    }
  },
  async getByFullname(fullname) {
    return this.find({fullname})
  }
}


module.exports = mongoose.model('Client', clientSchema);
