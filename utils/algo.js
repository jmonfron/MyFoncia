const recur = ({ x, l, r }, path = [], all = []) => {
  const currentPath = [ ...path, x ]
  if (!l && !r) {
    all.push(currentPath.join('.'))
  }
  if (l) {
    recur(l, currentPath, all)
  }
  if (r) {
    recur(r, currentPath, all)
  }
  return all
}

export default recur