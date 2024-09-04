mod features;

use features::cli_config::get_matches;
use features::file_operations::create_file;
use features::file_operations::rename_images;

fn main() {
    let matches = get_matches();

    // フォーマット変更
    if matches.is_present("rename") {
        if let Err(e) = rename_images(matches) {
            eprintln!("Error renaming images: {}", e);
        };
        return;
    }
    // それ以外はファイル作成
    create_file(matches);
}
