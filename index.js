'use strict';
module.exports = function (buf) {
	if (!(buf && buf.length > 1)) {
		return null;
	}

	// 46 55 4a 49 46 49 4c 4d 43 43 44 2d 52 41 57 20
	// FujiFilm RAW (e.g. XT-20) - https://libopenraw.freedesktop.org/wiki/Fuji_RAF/
  if (buf[0] === 0x46 && buf[1] === 0x55 && buf[2] === 0x4a && buf[3] === 0x49
    && buf[4] === 0x46 && buf[5] === 0x49 && buf[6] === 0x4c && buf[7] === 0x4d && buf[8] === 0x43 && buf[9] === 0x43 && buf[10] === 0x44 && buf[11] === 0x2d && buf[12] === 0x52) {
    return {
      ext: 'raf',
      mime: 'image/x-fuji-raf',
      info: 'FujiFilm Raw'
    };
  }

	// 25 21 50 53 2D 41 64 6F 62 65 2D 33 2E 30 20 45 50 53 46 2D 33 20 30
	// https://billatnapier.wordpress.com/2013/04/22/magic-numbers-in-files/
  if (buf[0] === 0x25 && buf[1] === 0x21 && buf[2] === 0x50 && buf[3] === 0x53
    && buf[4] === 0x2d && buf[5] === 0x41 && buf[6] === 0x64 && buf[7] === 0x6f && buf[8] === 0x62 && buf[9] === 0x65 && buf[10] === 0x2d && buf[11] === 0x33 && buf[12] === 0x2e) {
    return {
      ext: 'eps',
      mime: 'image/x-eps',
      info: 'Encapsulated PostScript'
    };
  }

	// 5a 4f 4f 4d 20 48 36 20 70 72 6a 65 63 -> Zoom H6 Project File
	// http://www.dvinfo.net/forum/all-things-audio/525930-zoom-h6-file-name.html
	// http://fileformats.archiveteam.org/wiki/Heroglyph_Project_Format
  if (buf[0] === 0x5a && buf[1] === 0x4f && buf[2] === 0x4f && buf[3] === 0x4d
    && buf[4] === 0x20 && buf[5] === 0x48 && buf[6] === 0x36 && buf[7] === 0x20 && buf[8] === 0x70 && buf[9] === 0x72 && buf[10] === 0x6a && buf[11] === 0x65 && buf[12] === 0x63) {
    return {
      ext: 'hprj',
      mime: 'application/octet-stream',
      info: 'Zoom H6 Project File'
    };
  }


  // Signature: 00 00 04 XX 52 45 44 32 05 10 52 32 04 01 0c 00 -> RED REDCODE RAW- R3d
  if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x04
		&& buf[4] === 0x52 && buf[5] === 0x45 && buf[6] === 0x44 && buf[7] === 0x32 && buf[8] === 0x05 && buf[9] === 0x10 && buf[10] === 0x52 && buf[11] === 0x32) {
    return {
      ext: 'r3d',
      mime: 'application/octet-stream',
      info: 'RED Redcode Raw'
    };
  }

	// 00 1f 01 34 75 72 6e 3a 73 63 68 65 6d 61 73 2d 70 72 6f 66
	// RealTimeMetaCameraMeta.xsd - Sony PMW-EX
  if (buf[0] === 0x00 && buf[1] === 0x1f && buf[2] === 0x01 && buf[3] === 0x34 && buf[4] === 0x75 && buf[5] === 0x72 && buf[6] === 0x6e
    	&& buf[7] === 0x3a && buf[8] === 0x73 && buf[9] === 0x63 && buf[10] === 0x68) {
    return {
      ext: 'xsd',
      mime: 'text/xml',
      info: 'Sony PMV-EX Camera Metadata'
    };
  }

  // 50 58 4d 44 4d 45 54 - PXM - Pixelmator
  // https://github.com/iJunkie22/libpxm/blob/master/pxm-spec.md
  if (buf[0] === 0x50 && buf[1] === 0x58 && buf[2] === 0x4d && buf[3] === 0x44 && buf[4] === 0x4d && buf[5] === 0x45 && buf[6] === 0x54) {
    return {
      ext: 'pxm',
      mime: 'application/x-pixelmator',
      info: 'Pixelmator'
    };
  }

  // ff fa XXXXXXXXX - MPEG ADTS, layer III, v1, 256 kbps, 44.1 kHz, JntStereo
  // https://gist.github.com/navinpai/983632
  if (buf[0] === 0xff && buf[1] === 0xfa) {
    return {
      ext: 'mp3',
      mime: 'audio/mpeg',
      info: 'MPEG ADTS, layer III, v1'
    };
  }

  // ff f1 - AAC MPEG-4 Advanced Audio Coding (AAC) Low Complexity (LC) audio file
  if (buf[0] === 0xff && buf[1] === 0xf1) {
    return {
      ext: 'aac',
      mime: 'audio/aac',
      info: 'mpeg4'
    };
	}
	// ff f9 - AAC MPEG-2 Advanced Audio Coding (AAC) Low Complexity (LC) audio file
  if (buf[0] === 0xff && buf[1] === 0xf9) {
    return {
      ext: 'aac',
      mime: 'audio/aac',
      info: 'mpeg2'
    };
  }
	// ISOM - MP4 compatible 00 00 00 (14|28) 66 74 79 70 69 73 6F 6D - Source: http://tool.lu/magicbytes/
  if (buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x69 && buf[9] === 0x73 && buf[10] === 0x6F && buf[11] === 0x6D) {
    return {
      ext: 'mp4',
      mime: 'video/mp4',
			info: 'isom'
    };
  }

	// 66 74 79 70 6D 70 34 32 - 0ftypmp42qt  isomhvc1 (h265) -> m4v -https://www.garykessler.net/library/file_sigs.html
  if (buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x6D && buf[9] === 0x70 && buf[10] === 0x34 && buf[11] === 0x32) {
    return {
      ext: 'm4v',
      mime: 'video/mp4',
      info: 'isom, hvc1'
    };
	}
	// 00 00 00 24 66 74 79 70 4d ->  ftypM4VHM4VHM4V M4A mp42isom��moovlmvhd
	// see also below L438
	if (buf[3] === 0x24 && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x4D && buf[9] === 0x34 && buf[10] === 0x56) {
    return {
      ext: 'm4v',
      mime: 'video/mp4',
      info: 'isom, mvhd'
    };
	}



	// Adobe Indesign 06 06 ed f5 d8 1d 46 e5 bd 31 ef e7 fe 74 b7 1d 44 4f 43 55
  if (buf[0] === 0x06 && buf[1] === 0x06 && buf[2] === 0xed && buf[3] === 0xf5 && buf[4] === 0xd8 && buf[5] === 0x1d && buf[6] === 0x46 &&
    buf[7] === 0xe5 && buf[8] === 0xbd && buf[9] === 0x31 && buf[10] === 0xef && buf[11] === 0xe7) {
    return {
      ext: 'indd',
      mime: 'application/x-indesign'
    };
  }

	/// JPEG 2000 - https://tools.ietf.org/html/rfc3745
  // 00 00 00 0C 6A 50 20 20 0D 0A 87 0A
  if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x00 && buf[3] === 0x0C && buf[4] === 0x6A && buf[5] === 0x50 && buf[6] === 0x20 &&
      buf[7] === 0x20 && buf[8] === 0x0D && buf[9] === 0x0A && buf[10] === 0x87 && buf[11] === 0x0A) {
    return {
      ext: 'jp2',
      mime: 'image/jp2'
    };
  }

	// MPEGTS - https://github.com/devttys0/binwalk/issues/225 | https://en.wikipedia.org/wiki/MPEG_transport_stream
  // 47 40 should always be at the start
  if (buf[0] === 0x47 && buf[1] === 0x40 ||
      buf[4] === 0x47 && buf[5] === 0x40 && buf[6] === 0x00) {
    return {
      ext: 'ts',
      mime: 'video/MP2T'
    };
  }

	// AIFF - 46 4F 52 4D 00- http://www.digitalpreservation.gov/formats/fdd/fdd000005.shtml
  if (buf[0] === 0x46 && buf[1] === 0x4F && buf[2] === 0x52 && buf[3] === 0x4D && buf[4] === 0x00) {
    return {
      ext: 'aiff',
      mime: 'audio/aiff'
    };
  }

  // AIFC - Compressed AIFF -  46 4F 52 4D ?? ?? ?? ?? 41 49 46 46
  if (buf[0] === 0x46 && buf[1] === 0x4F && buf[2] === 0x52 && buf[3] === 0x4D && buf[8] === 0x41 && buf[9] === 0x49 && buf[10] === 0x46 && buf[11] === 0x46) {
    return {
      ext: 'aifc',
      mime: 'audio/aiff'
    };
  }

	// File from vi (.vim) - text - (4d 79 20) 74 65 73 74
	if (buf[0] === 0x4d && buf[1] === 0x79 && buf[2] === 0x20 && buf[3] === 0x74 && buf[4] === 0x65 && buf[5] === 0x73 && buf[6] === 0x74 ||
			buf[0] === 0x74 && buf[1] === 0x65 && buf[2] === 0x73 && buf[3] === 0x74) {
		return {
			ext: 'vim',
			mime: 'text/plain'
		};
	}


	// MOV with missing MOOV atom at the beginning 00 00 00 08 77 69 64 65 00 03
	if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x00 && buf[3] === 0x08 && buf[4] === 0x77 && buf[5] === 0x69 && buf[6] === 0x64 && buf[7] === 0x65) {
		return {
			ext: 'mov',
			mime: 'video/quicktime',
			info: 'wide' // Byte order
		};
	}


	// MOV with free byte order - https://www.loc.gov/preservation/digital/formats/fdd/fdd000052.shtml
	// xx xx xx xx 66 72 65 65
	// still thinking that pos 0 is 0x00
	if (buf[0] === 0x00 && buf[4] === 0x66 && buf[5] === 0x72 && buf[6] === 0x65 && buf[7] === 0x65 ) {
		return {
			ext: 'mov',
			mime: 'video/quicktime',
			info: 'free' // Byte order
		};
	}

  // Apple QuickTime movie (unoptimized) - 00 00 00 20 6d 64 61 74 66 74 79 70 66 74 79 70 66 74 79 70
	// 00 00 00 - 6d 64 61 74 -
  if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x00 && buf[4] === 0x6d && buf[5] === 0x64 && buf[6] === 0x61 && buf[7] === 0x74 ) {
    return {
      ext: 'mov',
      mime: 'video/quicktime',
      info: 'Apple QuickTime movie (unoptimized)' // Byte order
    };
  }

  // Apple QuickTime movie (unoptimized) - 00 00 00 01 6d 64 61 74 00 00 00 00 82 bb 60 00 00 00 00 00
  if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x00 && buf[3] === 0x01 && buf[4] === 0x6d && buf[5] === 0x64 && buf[6] === 0x61 && buf[7] === 0x74 ) {
    return {
      ext: 'mov',
      mime: 'video/quicktime',
      info: 'Apple QuickTime movie (unoptimized)' // Byte order
    };
  }

  // AVCHD - ClipWrap 2.4.3 // Signature:00 0c 14 d9 ||| 6d 6f 6f 76 00 00 00 6c 6d 76 68 64 00 00 00 00
  if (buf[4] === 0x6d && buf[5] === 0x6f && buf[6] === 0x6f && buf[7] === 0x76 && buf[8] === 0x00 && buf[9] === 0x00 && buf[10] === 0x00 && buf[11] === 0x6c && buf[12] === 0x6d && buf[13] === 0x76) {
    return {
      ext: 'mov',
      mime: 'video/quicktime',
    };
  }


  if (buf[0] === 0x57 && buf[1] === 0x45 && buf[2] === 0x42 && buf[3] === 0x56 && buf[4] === 0x54 && buf[5] === 0x54) {
		return {
			ext: 'vtt',
			mime: 'text/plain'
		};
	}

	if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF && buf[3] === 0x57 && buf[4] === 0x45 && buf[5] === 0x42 && buf[6] === 0x56 && buf[7] === 0x54 && buf[8] === 0x54) {
		return {
			ext: 'vtt',
			mime: 'text/plain'
		};
	}

  if (buf[0] === 0x5b && buf[1] === 53 && buf[2] === 0x63 && buf[3] === 0x72 && buf[4] === 0x69) {
    return {
      ext: 'ssa',
      mime: 'text/plain'
    };
  }

	// ef bb bf 31 0d 0a 30
  if ((buf[0] === 0x31 && buf[1] === 0x0d && buf[2] === 0x0a && buf[3] === 0x30 && buf[4] === 0x30 && buf[5] === 0x3a && buf[6] === 0x30)
    ||	(buf[0] === 0x31 && buf[1] === 0x0a && buf[3] === 0x30)
		|| (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf && buf[3] === 0x31 && buf[4] === 0x0d && buf[5] === 0x0a)) {
		return {
			ext: 'srt',
			mime: 'text/plain'
		};
	}


	if (buf[0] === 0xC5 && buf[1] === 0xD0 && buf[2] === 0xD3 && buf[3] === 0xC6) {
		return {
			ext: 'eps',
			mime: 'image/x-eps'
		};
	}



	if (buf[0] === 0x06 && buf[1] === 0x0E && buf[2] === 0x2B && buf[3] === 0x34 && buf[4] === 0x02 && buf[5] === 0x05 && buf[6] === 0x01 && buf[7] === 0x01 && buf[8] === 0x0d && buf[9] === 0x01 && buf[10] === 0x02) {
		return {
			ext: 'mxf',
			mime: 'application/mxf'
		};
	}

	if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) {
		return {
			ext: 'jpg',
			mime: 'image/jpeg'
		};
	}

	if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
		return {
			ext: 'png',
			mime: 'image/png'
		};
	}

	if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
		return {
			ext: 'gif',
			mime: 'image/gif'
		};
	}

	if (buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) {
		return {
			ext: 'webp',
			mime: 'image/webp'
		};
	}

	// needs to be before `tif` check
	if (((buf[0] === 0x49 && buf[1] === 0x49 && buf[2] === 0x2A && buf[3] === 0x0) || (buf[0] === 0x4D && buf[1] === 0x4D && buf[2] === 0x0 && buf[3] === 0x2A)) && buf[8] === 0x43 && buf[9] === 0x52) {
		return {
			ext: 'cr2',
			mime: 'image/x-canon-cr2'
		};
	}

	if ((buf[0] === 0x49 && buf[1] === 0x49 && buf[2] === 0x2A && buf[3] === 0x0) || (buf[0] === 0x4D && buf[1] === 0x4D && buf[2] === 0x0 && buf[3] === 0x2A)) {
		return {
			ext: 'tif',
			mime: 'image/tiff'
		};
	}

	if (buf[0] === 0x42 && buf[1] === 0x4D) {
		return {
			ext: 'bmp',
			mime: 'image/bmp'
		};
	}

	if (buf[0] === 0x49 && buf[1] === 0x49 && buf[2] === 0xBC) {
		return {
			ext: 'jxr',
			mime: 'image/vnd.ms-photo'
		};
	}

	if (buf[0] === 0x38 && buf[1] === 0x42 && buf[2] === 0x50 && buf[3] === 0x53) {
		return {
			ext: 'psd',
			mime: 'image/vnd.adobe.photoshop'
		};
	}

	// needs to be before `zip` check
	if (buf[0] === 0x50 && buf[1] === 0x4B && buf[2] === 0x3 && buf[3] === 0x4 && buf[30] === 0x6D && buf[31] === 0x69 && buf[32] === 0x6D && buf[33] === 0x65 && buf[34] === 0x74 && buf[35] === 0x79 && buf[36] === 0x70 && buf[37] === 0x65 && buf[38] === 0x61 && buf[39] === 0x70 && buf[40] === 0x70 && buf[41] === 0x6C && buf[42] === 0x69 && buf[43] === 0x63 && buf[44] === 0x61 && buf[45] === 0x74 && buf[46] === 0x69 && buf[47] === 0x6F && buf[48] === 0x6E && buf[49] === 0x2F && buf[50] === 0x65 && buf[51] === 0x70 && buf[52] === 0x75 && buf[53] === 0x62 && buf[54] === 0x2B && buf[55] === 0x7A && buf[56] === 0x69 && buf[57] === 0x70) {
		return {
			ext: 'epub',
			mime: 'application/epub+zip'
		};
	}

	// needs to be before `zip` check
	// assumes signed .xpi from addons.mozilla.org
	if (buf[0] === 0x50 && buf[1] === 0x4B && buf[2] === 0x3 && buf[3] === 0x4 && buf[30] === 0x4D && buf[31] === 0x45 && buf[32] === 0x54 && buf[33] === 0x41 && buf[34] === 0x2D && buf[35] === 0x49 && buf[36] === 0x4E && buf[37] === 0x46 && buf[38] === 0x2F && buf[39] === 0x6D && buf[40] === 0x6F && buf[41] === 0x7A && buf[42] === 0x69 && buf[43] === 0x6C && buf[44] === 0x6C && buf[45] === 0x61 && buf[46] === 0x2E && buf[47] === 0x72 && buf[48] === 0x73 && buf[49] === 0x61) {
		return {
			ext: 'xpi',
			mime: 'application/x-xpinstall'
		};
	}

	if (buf[0] === 0x50 && buf[1] === 0x4B && (buf[2] === 0x3 || buf[2] === 0x5 || buf[2] === 0x7) && (buf[3] === 0x4 || buf[3] === 0x6 || buf[3] === 0x8)) {
		return {
			ext: 'zip',
			mime: 'application/zip'
		};
	}

	if (buf[257] === 0x75 && buf[258] === 0x73 && buf[259] === 0x74 && buf[260] === 0x61 && buf[261] === 0x72) {
		return {
			ext: 'tar',
			mime: 'application/x-tar'
		};
	}

	if (buf[0] === 0x52 && buf[1] === 0x61 && buf[2] === 0x72 && buf[3] === 0x21 && buf[4] === 0x1A && buf[5] === 0x7 && (buf[6] === 0x0 || buf[6] === 0x1)) {
		return {
			ext: 'rar',
			mime: 'application/x-rar-compressed'
		};
	}

	if (buf[0] === 0x1F && buf[1] === 0x8B && buf[2] === 0x8) {
		return {
			ext: 'gz',
			mime: 'application/gzip'
		};
	}

	if (buf[0] === 0x42 && buf[1] === 0x5A && buf[2] === 0x68) {
		return {
			ext: 'bz2',
			mime: 'application/x-bzip2'
		};
	}

	if (buf[0] === 0x37 && buf[1] === 0x7A && buf[2] === 0xBC && buf[3] === 0xAF && buf[4] === 0x27 && buf[5] === 0x1C) {
		return {
			ext: '7z',
			mime: 'application/x-7z-compressed'
		};
	}

	if (buf[0] === 0x78 && buf[1] === 0x01) {
		return {
			ext: 'dmg',
			mime: 'application/x-apple-diskimage'
		};
	}

	if (
		(buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x0 && (buf[3] === 0x18 || buf[3] === 0x20) && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) ||
		(buf[0] === 0x33 && buf[1] === 0x67 && buf[2] === 0x70 && buf[3] === 0x35) ||
		(buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x0 && buf[3] === 0x1C && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) ||
		(buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x0 && buf[3] === 0x1C && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x6D && buf[9] === 0x70 && buf[10] === 0x34 && buf[11] === 0x32 && buf[16] === 0x6D && buf[17] === 0x70 && buf[18] === 0x34 && buf[19] === 0x31 && buf[20] === 0x6D && buf[21] === 0x70 && buf[22] === 0x34 && buf[23] === 0x32 && buf[24] === 0x69 && buf[25] === 0x73 && buf[26] === 0x6F && buf[27] === 0x6D) ||
		(buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x0 && buf[3] === 0x1C && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x69 && buf[9] === 0x73 && buf[10] === 0x6F && buf[11] === 0x6D) ||
		(buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x0 && buf[3] === 0x1c && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x6D && buf[9] === 0x70 && buf[10] === 0x34 && buf[11] === 0x32 && buf[12] === 0x0 && buf[13] === 0x0 && buf[14] === 0x0 && buf[15] === 0x0)
	) {
		return {
			ext: 'mp4',
			mime: 'video/mp4'
		};
	}

	if ((buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x0 && buf[3] === 0x1C && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x4D && buf[9] === 0x34 && buf[10] === 0x56)) {
		return {
			ext: 'm4v',
			mime: 'video/x-m4v'
		};
	}

	if (buf[0] === 0x4D && buf[1] === 0x54 && buf[2] === 0x68 && buf[3] === 0x64) {
		return {
			ext: 'mid',
			mime: 'audio/midi'
		};
	}

	// needs to be before the `webm` check
	if (buf[31] === 0x6D && buf[32] === 0x61 && buf[33] === 0x74 && buf[34] === 0x72 && buf[35] === 0x6f && buf[36] === 0x73 && buf[37] === 0x6B && buf[38] === 0x61) {
		return {
			ext: 'mkv',
			mime: 'video/x-matroska'
		};
	}

	if (buf[0] === 0x1A && buf[1] === 0x45 && buf[2] === 0xDF && buf[3] === 0xA3) {
		return {
			ext: 'webm',
			mime: 'video/webm'
		};
	}

	if (buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x0 && buf[3] === 0x14 && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) {
		return {
			ext: 'mov',
			mime: 'video/quicktime'
		};
	}

	if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x41 && buf[9] === 0x56 && buf[10] === 0x49) {
		return {
			ext: 'avi',
			mime: 'video/x-msvideo'
		};
	}

	if (buf[0] === 0x30 && buf[1] === 0x26 && buf[2] === 0xB2 && buf[3] === 0x75 && buf[4] === 0x8E && buf[5] === 0x66 && buf[6] === 0xCF && buf[7] === 0x11 && buf[8] === 0xA6 && buf[9] === 0xD9) {
		return {
			ext: 'wmv',
			mime: 'video/x-ms-wmv'
		};
	}

	if (buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x1 && buf[3].toString(16)[0] === 'b') {
		return {
			ext: 'mpg',
			mime: 'video/mpeg'
		};
	}

	if ((buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) || (buf[0] === 0xFF && buf[1] === 0xfb)) {
		return {
			ext: 'mp3',
			mime: 'audio/mpeg'
		};
	}

	if ((buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70 && buf[8] === 0x4D && buf[9] === 0x34 && buf[10] === 0x41) || (buf[0] === 0x4D && buf[1] === 0x34 && buf[2] === 0x41 && buf[3] === 0x20)) {
		return {
			ext: 'm4a',
			mime: 'audio/m4a'
		};
	}

	// needs to be before `ogg` check
	if (buf[28] === 0x4F && buf[29] === 0x70 && buf[30] === 0x75 && buf[31] === 0x73 && buf[32] === 0x48 && buf[33] === 0x65 && buf[34] === 0x61 && buf[35] === 0x64) {
		return {
			ext: 'opus',
			mime: 'audio/opus'
		};
	}

	if (buf[0] === 0x4F && buf[1] === 0x67 && buf[2] === 0x67 && buf[3] === 0x53) {
		return {
			ext: 'ogg',
			mime: 'audio/ogg'
		};
	}

	if (buf[0] === 0x66 && buf[1] === 0x4C && buf[2] === 0x61 && buf[3] === 0x43) {
		return {
			ext: 'flac',
			mime: 'audio/x-flac'
		};
	}

	if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x57 && buf[9] === 0x41 && buf[10] === 0x56 && buf[11] === 0x45) {
		return {
			ext: 'wav',
			mime: 'audio/x-wav'
		};
	}

	if (buf[0] === 0x23 && buf[1] === 0x21 && buf[2] === 0x41 && buf[3] === 0x4D && buf[4] === 0x52 && buf[5] === 0x0A) {
		return {
			ext: 'amr',
			mime: 'audio/amr'
		};
	}

	if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) {
		return {
			ext: 'pdf',
			mime: 'application/pdf'
		};
	}

	if (buf[0] === 0x4D && buf[1] === 0x5A) {
		return {
			ext: 'exe',
			mime: 'application/x-msdownload'
		};
	}

	if ((buf[0] === 0x43 || buf[0] === 0x46) && buf[1] === 0x57 && buf[2] === 0x53) {
		return {
			ext: 'swf',
			mime: 'application/x-shockwave-flash'
		};
	}

	if (buf[0] === 0x7B && buf[1] === 0x5C && buf[2] === 0x72 && buf[3] === 0x74 && buf[4] === 0x66) {
		return {
			ext: 'rtf',
			mime: 'application/rtf'
		};
	}

	if (
		(buf[0] === 0x77 && buf[1] === 0x4F && buf[2] === 0x46 && buf[3] === 0x46) &&
		(
			(buf[4] === 0x00 && buf[5] === 0x01 && buf[6] === 0x00 && buf[7] === 0x00) ||
			(buf[4] === 0x4F && buf[5] === 0x54 && buf[6] === 0x54 && buf[7] === 0x4F)
		)
	) {
		return {
			ext: 'woff',
			mime: 'application/font-woff'
		};
	}

	if (
		(buf[0] === 0x77 && buf[1] === 0x4F && buf[2] === 0x46 && buf[3] === 0x32) &&
		(
			(buf[4] === 0x00 && buf[5] === 0x01 && buf[6] === 0x00 && buf[7] === 0x00) ||
			(buf[4] === 0x4F && buf[5] === 0x54 && buf[6] === 0x54 && buf[7] === 0x4F)
		)
	) {
		return {
			ext: 'woff2',
			mime: 'application/font-woff'
		};
	}

	if (
		(buf[34] === 0x4C && buf[35] === 0x50) &&
		(
			(buf[8] === 0x00 && buf[9] === 0x00 && buf[10] === 0x01) ||
			(buf[8] === 0x01 && buf[9] === 0x00 && buf[10] === 0x02) ||
			(buf[8] === 0x02 && buf[9] === 0x00 && buf[10] === 0x02)
		)
	) {
		return {
			ext: 'eot',
			mime: 'application/octet-stream'
		};
	}

	if (buf[0] === 0x00 && buf[1] === 0x01 && buf[2] === 0x00 && buf[3] === 0x00 && buf[4] === 0x00) {
		return {
			ext: 'ttf',
			mime: 'application/font-sfnt'
		};
	}

	if (buf[0] === 0x4F && buf[1] === 0x54 && buf[2] === 0x54 && buf[3] === 0x4F && buf[4] === 0x00) {
		return {
			ext: 'otf',
			mime: 'application/font-sfnt'
		};
	}

	if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x01 && buf[3] === 0x00) {
		return {
			ext: 'ico',
			mime: 'image/x-icon'
		};
	}

	if (buf[0] === 0x46 && buf[1] === 0x4C && buf[2] === 0x56 && buf[3] === 0x01) {
		return {
			ext: 'flv',
			mime: 'video/x-flv'
		};
	}

	if (buf[0] === 0x25 && buf[1] === 0x21) {
		return {
			ext: 'ps',
			mime: 'application/postscript'
		};
	}

	if (buf[0] === 0xFD && buf[1] === 0x37 && buf[2] === 0x7A && buf[3] === 0x58 && buf[4] === 0x5A && buf[5] === 0x00) {
		return {
			ext: 'xz',
			mime: 'application/x-xz'
		};
	}

	if (buf[0] === 0x53 && buf[1] === 0x51 && buf[2] === 0x4C && buf[3] === 0x69) {
		return {
			ext: 'sqlite',
			mime: 'application/x-sqlite3'
		};
	}

	if (buf[0] === 0x4E && buf[1] === 0x45 && buf[2] === 0x53 && buf[3] === 0x1A) {
		return {
			ext: 'nes',
			mime: 'application/x-nintendo-nes-rom'
		};
	}

	if (buf[0] === 0x43 && buf[1] === 0x72 && buf[2] === 0x32 && buf[3] === 0x34) {
		return {
			ext: 'crx',
			mime: 'application/x-google-chrome-extension'
		};
	}

	if (
		(buf[0] === 0x4D && buf[1] === 0x53 && buf[2] === 0x43 && buf[3] === 0x46) ||
		(buf[0] === 0x49 && buf[1] === 0x53 && buf[2] === 0x63 && buf[3] === 0x28)
	) {
		return {
			ext: 'cab',
			mime: 'application/vnd.ms-cab-compressed'
		};
	}

	// needs to be before `ar` check
	if (buf[0] === 0x21 && buf[1] === 0x3C && buf[2] === 0x61 && buf[3] === 0x72 && buf[4] === 0x63 && buf[5] === 0x68 && buf[6] === 0x3E && buf[7] === 0x0A && buf[8] === 0x64 && buf[9] === 0x65 && buf[10] === 0x62 && buf[11] === 0x69 && buf[12] === 0x61 && buf[13] === 0x6E && buf[14] === 0x2D && buf[15] === 0x62 && buf[16] === 0x69 && buf[17] === 0x6E && buf[18] === 0x61 && buf[19] === 0x72 && buf[20] === 0x79) {
		return {
			ext: 'deb',
			mime: 'application/x-deb'
		};
	}

	if (buf[0] === 0x21 && buf[1] === 0x3C && buf[2] === 0x61 && buf[3] === 0x72 && buf[4] === 0x63 && buf[5] === 0x68 && buf[6] === 0x3E) {
		return {
			ext: 'ar',
			mime: 'application/x-unix-archive'
		};
	}

	if (buf[0] === 0xED && buf[1] === 0xAB && buf[2] === 0xEE && buf[3] === 0xDB) {
		return {
			ext: 'rpm',
			mime: 'application/x-rpm'
		};
	}

	if (
		(buf[0] === 0x1F && buf[1] === 0xA0) ||
		(buf[0] === 0x1F && buf[1] === 0x9D)
	) {
		return {
			ext: 'Z',
			mime: 'application/x-compress'
		};
	}

	if (buf[0] === 0x4C && buf[1] === 0x5A && buf[2] === 0x49 && buf[3] === 0x50) {
		return {
			ext: 'lz',
			mime: 'application/x-lzip'
		};
	}

	if (buf[0] === 0xD0 && buf[1] === 0xCF && buf[2] === 0x11 && buf[3] === 0xE0 && buf[4] === 0xA1 && buf[5] === 0xB1 && buf[6] === 0x1A && buf[7] === 0xE1) {
		return {
			ext: 'msi',
			mime: 'application/x-msi'
		};
	}

	return null;
};
