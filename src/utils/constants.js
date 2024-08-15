const TableColumns = [
  "Category",
  "Level",
  "Question",
  "Link",
  "BF Approach",
  "BF Solution",
  "BF Complexity",
  "Opt Approach",
  "Opt Solution",
  "Complexity",
];

const ExtendedTableColumns = ["Question", "BF Approach", "Opt Approach"];

const LinksForTableColmns = ["Link", "BF Solution", "Opt Solution"];

const AddQuestionFormInputs = [
  {
    id: "1",
    name: "category",
    type: "input",
    placeholder: "",
    label: "Category",
  },
  {
    id: "2",
    name: "level",
    type: "input",
    placeholder: "",
    label: "Level",
  },
  {
    id: "3",
    name: "question_desc",
    type: "input",
    placeholder: "",
    label: "Question Description",
  },
  {
    id: "4",
    name: "question_link",
    type: "input",
    placeholder: "",
    label: "Question Link",
  },
  {
    id: "5",
    name: "bf_sc",
    type: "input",
    placeholder: "",
    label: "BF Space Complexity",
  },
  {
    id: "6",
    name: "bf_tc",
    type: "input",
    placeholder: "",
    label: "BF Time Complexity",
  },
  {
    id: "7",
    name: "bf_approach",
    type: "text",
    placeholder: "",
    label: "BF Approach",
  },
  {
    id: "8",
    name: "opt_sc",
    type: "input",
    placeholder: "",
    label: "Optimal Space Complexity",
  },
  {
    id: "9",
    name: "opt_tc",
    type: "input",
    placeholder: "",
    label: "Optimal Time Complexity",
  },
  {
    id: "10",
    name: "opt_approach",
    type: "text",
    placeholder: "",
    label: "Optimal Approach",
  },
  {
    id: "11",
    name: "bf_solution",
    type: "input",
    placeholder: "",
    label: "BF Solution",
  },
  {
    id: "12",
    name: "opt_solution",
    type: "input",
    placeholder: "",
    label: "Optimal Solution",
  },
];

export {
  TableColumns,
  ExtendedTableColumns,
  LinksForTableColmns,
  AddQuestionFormInputs,
};
