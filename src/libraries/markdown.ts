/**
 * markdown文字列から以下のタグを取り除く
 * <ul>
 *  <li>見出し</li>
 *  <li>リンク</li>
 *  <li>リスト</li>
 * </ul>
 * @param markdownText markdown形式文字列
 * @returns markdownのタグを取り除いた文字列
 */
export function removeTags(markdownText: string): string {
  return markdownText
    .replace(/^#{1,3} (.*)$/gm, '$1')
    .replace(/\[(.+)]\(.+\)/gm, '$1')
    .replace(/^\s+\[*-] (.+)$/gm, '$1');
}
