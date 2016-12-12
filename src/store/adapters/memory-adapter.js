const Db = {
  'concerts/1': { id: '1', date: '2014-12-02', textPL: 'concert text PL 1', textEN: 'concert text EN 1' }
};

export default class MemoryAdapter {
  add(resourceType, resource) {
    return new Promise((resolve) => {
      const id = Math.random().toString();
      const resourceToSave = resource;
      resourceToSave.id = id;
      Db[`${resourceType}/${id}`] = resourceToSave;
      resolve(resourceToSave);
    });
  }

  all(resourceType) {
    return new Promise((resolve) => {
      const ids = Object.keys(Db).filter(id => id.indexOf(resourceType) !== -1);
      const values = ids.map(id => Db[id]);
      resolve(values);
    });
  }

  update(resourceType, resource) {
    return new Promise((resolve) => {
      const id = resource.id;
      Db[`${resourceType}/${id}`] = resource;
      resolve(resource);
    });
  }

  find(resourceType, id) {
    return new Promise((resolve) => {
      resolve(Db[`${resourceType}/${id}`]);
    });
  }
}
