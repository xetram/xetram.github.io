
export function setInlineComments(htmlIn) {
  return htmlIn.replace(/\+\+\+(.+?)\+\+\+/g, "<span class=\"inline_comment\">$1</span>");
}

function setInlineCommentsInPostContent() {
  if ($("#post_content").length > 0) {
    // console.debug( $("#post_content").html);
    // console.log(setInlineComments($("#post_content").html()));
    $("#post_content").html(setInlineComments($("#post_content").html()));
  }
}

import * as videoEmbed from "./videoEmbed";
import * as audioEmbed from "./audioEmbed";
import handleIncludes from "./handleIncludes";
import {updateToc} from "./toc";
import {insertSidebarItems, insertNavItems} from "./sidebar";

// No includes processing - or adding navigation bars.
export function prepareContentWithoutIncludes() {
  setInlineCommentsInPostContent();
  audioEmbed.fillAudioEmbeds();
  videoEmbed.fillVideoEmbeds();
}

function onDocumentReadyTasks() {
  insertSidebarItems();
  if (topnavId) {
    insertNavItems("#div_top_bar", sidebarsData[topnavId]);
  }
  if (footernavId) {
    insertNavItems("#div_footer_bar", sidebarsData[footernavId]);
  }
  if (unicodeScript) {
    $("#post_content").attr("unicode_script", unicodeScript);
  }
  prepareContentWithoutIncludes();
  // For unknown reasons, handleIncludes() called first does not work as well 201901 desktop.
  handleIncludes();
  // Update table of contents (To be called whenever page contents are updated).
  updateToc();
  setupDisqus();
}

import {redirectToRandomPage, redirectToPage} from "./redirect";
// So that these can be used like module_main.default.redirectToPage(..).
export default {
  onDocumentReadyTasks: onDocumentReadyTasks,
  redirectToRandomPage: redirectToRandomPage,
  redirectToPage: redirectToPage
}

