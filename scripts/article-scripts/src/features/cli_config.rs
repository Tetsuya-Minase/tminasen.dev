use clap::{App, Arg, ArgMatches};

pub fn get_matches<'a>() -> ArgMatches<'a> {
    App::new("article creator")
        .version("0.0.2")
        .author("tminasen")
        .about("article utility tools")
        .arg(
            Arg::with_name("file-name")
                .short("n")
                .long("name")
                .value_name("FILE_NAME")
                .help("specify file name")
                .takes_value(true)
                .required(false),
        )
        .arg(
            Arg::with_name("rename")
                .long("rename")
                .value_name("TARGET_DIR_NAME")
                .help("rename image files")
                .takes_value(true)
                .multiple(true)
                .required(false),
        )
        .get_matches()
}
