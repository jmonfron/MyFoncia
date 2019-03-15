import gestionnaireSchema from '../schema/gestionnaire'
import algo from '../utils/algo'

async function get(req, res) {
  let { fullname } = req.params

  if (!fullname.includes(' ')) // si fullname ne contient pas d'espace on l'ajoute
    fullname = fullname.replace(/([A-Z])/g, ' $1').trim()
  const gestionnaire = await gestionnaireSchema.getByFullname(fullname)

  if (!gestionnaire.length)
    return res.status(404).send({ message: `gestionnaire ${fullname} not found` })

  const arrayNumbers = algo(gestionnaire[0].numeros)
  return res.status(200).send(arrayNumbers)
}

export default {
  get
}