function getWhereClause(where, gejala) {
  for (let g in gejala) {
    if (g != gejala.length - 1) {
      where = where + `'${gejala[g]}' like ANY(gejala) AND `;
    } else {
      where = where + `'${gejala[g]}' like ANY(gejala)`;
    }
  }
  return where;
}

function refactorResponse(response, records, gejala) {
  for (let i in records) {
    let new_record = {};
    new_record["variant_name"] = records[i]["variant_name"];
    new_record["icd_10"] = records[i]["icd_10"];
    new_record["accuracy"] =
      ((100 * gejala.length) / records[i]["gejala"].length).toFixed(2) + " %";
    new_record["gejala"] = records[i]["gejala"];
    response.push(new_record);
  }
  return response;
}

module.exports = {
  getWhereClause,
  refactorResponse,
};
