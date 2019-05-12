export default function() {
  return [
    {
      title: "Dashboard",
      to: "/speech-to-text",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Upload",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/upload",
    },
    {
      title: "File List",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/list",
    },
    {
      title: "Search",
      htmlBefore: '<i class="material-icons">search</i>',
      to: "/search",
    },
  ];
}
