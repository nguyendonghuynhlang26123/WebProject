const View = require("../../../models/view.schema");

async function updateView() {
  const month = new Date(Date.now()).getMonth() + 1;
  const year = new Date(Date.now()).getFullYear();
  const viewTable = await View.findOne({ month: month, year: year });
  if (!viewTable) {
    let data = {
      month: month,
      year: year,
      views: 1,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    view = await View.create(data);
    return view;
  }
  viewTable.views += 1;
  viewTable.updated_at = Date.now();
  const result = await View.updateOne({ _id: viewTable._id }, viewTable);
  return result;
}

async function getViewByMonthYear(month, year) {
  if (!year) {
    const views = await View.find({ month: month });
    return views;
  }
  if (!month) {
    const views = await View.find({ year: year });
    return views;
  }
  const view = await View.findOne({ month: month, year: year });
  if (!view) throw new Error("Not Found!");
  return view;
}

async function getAllView() {
  const views = await View.find();
  return views;
}

module.exports = {
  updateView: updateView,
  getViewByMonthYear: getViewByMonthYear,
  getAllView: getAllView,
};
