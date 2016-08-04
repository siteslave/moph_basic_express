
module.exports = {
  getList: function (db) {
    return db('test_members as m')
      .select('m.id', 'm.fullname', 'm.username', 'g.name as group_name')
      .leftJoin('test_groups as g', 'g.id', 'm.group_id')
      .orderBy('m.fullname');
  },

  getGroups: function (db) {
    return db('test_groups')
      .select();
  },

  save: function (db, member) {
    return db('test_members')
      .insert(member);
  }
}