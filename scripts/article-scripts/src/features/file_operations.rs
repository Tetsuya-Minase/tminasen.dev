use chrono::Local;
use clap::ArgMatches;
use std::fs;
use std::fs::File;
use std::io;
use std::io::Write;
use uuid::Uuid;

///
/// file output
///
/// * `s` - text
/// * `path` - output path
///
fn write(s: &str, path: &str) -> io::Result<()> {
    let mut f = File::create(path)?;

    f.write_all(s.as_bytes())
}

///
/// create template files.
/// * `matches` - information about arguments.
///
pub fn create_file(matches: ArgMatches) {
    let file_name: String = match matches.value_of("file-name") {
        Some(name) => name.to_string(),
        None => Uuid::new_v4().to_string(),
    };

    // 画像用のディレクトリ作成
    fs::create_dir_all(format!("public/images/article/{}", file_name)).unwrap_or_else(|why| {
        println!("create image dir error: {:?}", why.kind());
    });
    // 記事用のディレクトリ作成
    fs::create_dir_all(format!("src/md-pages/{}", file_name)).unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });

    let template_data = format!(
        "---\n\
    path: \"/blog/{}\"\n\
    date: \"{}\"\n\
    title: \"\"\n\
    tag: [\"\"]\n\
    thumbnailImage: \"/images/\"\n\
    odpImage: \"/images/\"\n\
    ---",
        file_name,
        Local::now().format("%Y/%m/%d").to_string()
    );

    let markdown_path: String = format!("src/md-pages/{}/article{}.md", file_name, file_name);
    write(&template_data, &markdown_path).unwrap_or_else(|why| {
        println!("write markdown file error: {:?}", why.kind());
    });
    let image_path: String = format!("public/images/article/{}/.gitkeep", file_name);
    write("", &image_path).unwrap_or_else(|why| {
        println!("write image_path file error: {:?}", why.kind());
    });
}

///
/// rename image_files
/// * `matches` - rename file directory.
pub fn rename_images(matches: ArgMatches) -> io::Result<()> {
    let dir_name: String = match matches.value_of("rename") {
        Some(name) => name.to_string(),
        _ => "".to_string(),
    };

    let mut index = 1;
    fs::read_dir(format!("public/images/article/{}", dir_name))?
        .filter_map(|entry| {
            let entry = entry.ok()?;
            if entry.file_type().ok()?.is_file() {
                Some(entry.file_name().to_string_lossy().into_owned())
            } else {
                None
            }
        })
        .for_each(move |file| {
            let before_filename = format!("public/images/article/{}/{}", dir_name, file);
            let after_filename = format!(
                "public/images/article/{}/ss{}-{}.png",
                dir_name, dir_name, index
            );
            if let Err(e) = fs::rename(before_filename, after_filename) {
                eprintln!("Error renaming images: {}", e);
            };
            index += 1;
        });
    Ok(())
}
