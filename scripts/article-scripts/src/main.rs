mod features;

use features::cli_config::get_matches;
use features::file_operations::create_file;
use features::file_operations::rename_images;

fn main() {
    let matches = get_matches();

    // フォーマット変更
    if matches.is_present("rename") {
        rename_images(matches);
        return;
    }
    // それ以外はファイル作成
    create_file(matches);
}
