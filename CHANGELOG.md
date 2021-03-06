<a name="3.8.2"></a>

## [3.8.2](https://github.com/mmpro/file-type/compare/v3.8.1..v3.8.2) (2020-09-25 07:42:53)


### Bug Fix

* **App:** Fixed detecting Adobe Illustrator | MP | [c9f9a1bc46117ee89e94313ce0c3b22706d21b19](https://github.com/mmpro/file-type/commit/c9f9a1bc46117ee89e94313ce0c3b22706d21b19)    
Fixed detecting Adobe Illustrator  
Related issues: [undefined/undefined#AC-637](undefined/browse/AC-637)
### Chores

* **App:** Updated packages | MP | [5d078fdcb40e38eed12b4f430c7c0f826d3a473a](https://github.com/mmpro/file-type/commit/5d078fdcb40e38eed12b4f430c7c0f826d3a473a)    
Updated packages
<a name="3.8.1"></a>

## [3.8.1](https://github.com/mmpro/file-type/compare/v3.8.0..v3.8.1) (2020-06-30 11:27:33)


### Bug Fix

* **App:** Use mimetype image/heic for heic | MP | [ecead1c2e64b4bf0f2cb1456ba4fc6925818eb45](https://github.com/mmpro/file-type/commit/ecead1c2e64b4bf0f2cb1456ba4fc6925818eb45)    
Use mimetype image/heic for heic
### Style

* **App:** Lint fix | MP | [3a7b0a99472223c60ab331de5d3a8e808640f4b1](https://github.com/mmpro/file-type/commit/3a7b0a99472223c60ab331de5d3a8e808640f4b1)    
Lint fix
### Chores

* **App:** Prepare for ac-semantic-release | MP | [ec1061c57c1768d1125bb3dd4bef68ff80c5c361](https://github.com/mmpro/file-type/commit/ec1061c57c1768d1125bb3dd4bef68ff80c5c361)    
Prepare for ac-semantic-release
**3.8.21 - 02.02.2018**
+ updated: Detect ISOM HVC1 MP4 format 

**3.8.20 - 25.01.2018**
+ updated: Detect AIFC format 

**3.8.16 - 13.10.2017**
+ added: Detect EPS file (and distinguish from PS file)

**3.8.15 - 08.10.2017**
+ added: Zoom H6 projectfile (Heroglyph Project Format)

**3.8.14 - 21.09.2017**
+ added: RED Redcode RAW

**3.8.13 - 06.07.2017**
+ added: MPEG ADTS - related mmpro/ac-transcoding-server#142, mmpro/ac-transcoding-server#143, mmpro/ac-transcoding-server#144, mmpro/ac-transcoding-server#145
+ added: PXM file - related mmpro/ac-transcoding-server#136

**3.8.12 - 11.06.2017**
+ added: aac (MPEG-2 and MPEG-4)

**3.8.11 - 30.03.2017**
+ added: isom/mp4 compatible

**3.8.10 - 21.03.2017**
+ added: another MOV variant with AVCHD/Clip Wrap

**3.8.9 - 10.02.2017**
+ added: Adobe Indesign - 06 06 ed f5 d8 1d 46 e5 bd 31 ef e7 fe 74 b7 1d 44 4f 43 55

**3.8.8 - 15.01.2017**
+ updated: detect MPEG-TS if file header starts with 47 40

**3.8.7 - 15.01.2017**
+ added: JPEG2000 - 00 00 00 0C 6A 50 20 20 0D 0A 87 0A - related mmpro/ac-transcoding-server#107

**3.8.6 - 14.01.2017**
+ added: Apple QuickTime movie (unoptimized) - 00 00 00 01 6d 64 61 74 - mmpro/ac-transcoding-server#114

**3.8.5 - 13.01.2017**
+ added: additonal MPEG4 - 00 00 00 1c 66 74 79 70

**3.8.4 - 09.01.2017**
+ added: a different variation for SRT
+ added: detect SSA subtitle files

**3.8.3 - 08.01.2017**
+ added: magic numbers for MPEG TS

**3.8.2 - 08.01.2017**
+ added: magic numbers for aiff
+ added: httpInspector to quickly inspect a remote files

**3.8.1 - 27.09.2016**
+ added: magic numbers for mov (with byte orders wide and free), vim, srt and vtt
+ added: fileInspector to quickly inspect a local file
+ added: lodash for more convenience in fileInspector.js
