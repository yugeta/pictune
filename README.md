PicTune
==

# Summery
- This module is picture view tool.
- Click on the image to see the enlarged image later.


# Speficication
- CSSファイルはJS読み込みの際に自動で取得する。

- ページ内のクリックイベントで対象画像に"data-pictune"属性がある場合に発動する。
- imgタグと別の画像を読み込む場合は、"data-pictune-src"に対象画像URLを記述

- 処理順番
1. クリック
2. 背景画像表示（無ければ作成※初回）
3. 画像表示処理
4. 非表示処理（閉じるボタンまたは、背景クリック）

# install
1. add-tag to HTML-source
--
<script src="pictune/pictune.js"></script>
--

# DOM-Constructure

  - #pictune
    - .pictune-loading
    - .pictune-area
      - .pictune-close
      - .picture


# customize


# Version
0.1 : 2018.5.28 : first-commit
