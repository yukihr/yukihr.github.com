---
layout: post
title: "Warp - EmacsでリアルタイムにHTMLやmarkdownをプレビュー"
date: 2012-04-07 14:26
comments: true
categories: Emacs
---

EmacsでMarkdownやHTMLをリアルタイムでプレビューしながら編集できるWarp
というのを作ったのでご紹介〜。

[Github - yukihr/Warp](https://github.com/yukihr/Warp)

HTMLはともかくMarkdownなどのHTMLにコンバートできるフォーマットのプレ
ビューって割と需要がある気がします。今までもウェブベースで動くものとか
ネイティブアプリでプレビューの機能があるものはあったんですが、Emacsで
evilを使ってviキーバインドを使っているような<del>変態</del>こだわりの強
い自分はなかなかそういうものを使う気になれませんでした。やっぱり編集
作業はEmacsでやりたいんです・・・。

そこで作ったのがこれ、というわけでは実はなくて、発端はウェブアプリの開
発中にブラウザのリロードがめんどくさいなーと思ったのがきっかけです。で、
ウェブソケットサーバとクライアントを立ち上げておいてクライアントにサー
バを通してEmacsからリロード命令を送れば一切ブラウザに触らずにリロードで
きるんじゃ・・、と思って検証用にコードを書いてたらいつの間にかリアルタ
イムプレビュー用のマイナーモードになってました！どうしてこ（ｒｙ ・・・
まあ、オートリロード用のマイナーモードも書いてるんですがこちらのほうが
需要がありそうだったので。

## インストール

ウェブソケットを通してクライアント（ウェブページ）に命令を送るんですが、
Emacsで動くウェブソケットサーバを書くのはスキル的にも時間的にも無理ぽな
ので(そのうち誰かやりそうだけど)Node.jsで動くサーバに中継してもらいます。
なので、動作にはNode.jsが必要です（0.6.11と0.7.2でしか動作確認できてな
いですが多分最近のものであれば動くはず）。個人的には
[nave](https://github.com/isaacs/nave)を使ってインストールするのが簡単
でバージョン管理もできるのでよさげです。

Node.js がインストールできたらWarpのリポジトリをローカルにクローンしま
す。ファイルをダウンロードして展開でもよいです。以下、/path/to/.. は実
際のものに置き換えてください。

    $ cd /path/to/your/repos
    $ git clone https://github.com/yukihr/Warp.git 

ローカルにファイルを置いたら、npmモジュールであるところのwebsocketをイ
ンストール。package.jsonにインストール設定があるので、以下のようにしま
す。

    $ cd warp
    $ npm install

~/.emacs.d/init.el などの設定ファイルには以下のように書いておきます。

    (add-to-list 'load-path "/path/to/warp-directory")
    (require 'warp)
    ;; キーバインドは適当に
    (global-set-key (kbd "C-c C-w C-w") warp-mode)
    ;; Markdown を変換する場合
    (add-to-list 'warp-format-converter-alist
                 '("\\.md\\|\\.markdown" t (lambda ()
                                             ;; 使っているコマンドを指定
                                             '("markdown"))))

以上でインストールはおしまいです。お疲れ様でした〜。


## 使い方

プレビューを見たいバッファで `M-x warp-mode` （または設定したキーバイン
ド）、と。これだけ。初期設定で自動的にクライアントが立ち上がってプレ
ビューが始まります。markdownがインストール済みであれば試しにWarpの
README.mdを開いて `M-x warp-mode` してみてください。

デフォルトで warp-mode で使えるコマンドについては以下のようになります。

- warp-start-server

  サーバを起動します (`C-c C-w s`)

- warp-stop-server

  サーバを停止します (`C-c C-w i`)

- warp-open-client

  新しくクライアントを開きます (`C-c C-w o`)

- warp-send-current-buffer

  カレントバッファをコンバートしつつクライアントに転送します (`C-c C-w w`)
  

## 設定

### 自動機能を無効に

初期設定ではWarpは自動でクライアントを立ち上げたりバッファを転送した
りしてくれるんですが、そこまでやらなくてもいいよって方は以下のように設
定すると良いかと。

        (custom-set-variables
         '(warp-auto-start-sending nil)      ; 自動転送を無効に
         '(warp-auto-open-client nil)        ; クライアントの自動起動を無効に
         '(warp-auto-start-auto-scroll nil)) ; 自動スクロールを無効に

### Markdown, HTML 以外のフォーマット

Warp は原理的にはシェルコマンドを使ってHTMLに変換できるフォーマットであ
ればすべてのものに対応してます。このあたりの設定についてはflymakeを参考
にさせてもらいました。例えばtextileをredclothでコンバートするための設定
は以下のようになります（redclothのインストールが必要です）。

        (add-to-list 'warp-format-converter-alist
                     '("\\.textile" t (lambda () '("redcloth"))))
    
※ 自分の環境だと以下の記述がないとエラーがでました。

        (setenv "LC_ALL" "en_US.UTF-8")

`warp-format-converter-alist` に設定しているリストが設定情報になります。
設定情報の各要素は次のようになります。

1. 変換を行うファイル名、または正規表現

2. カレントバッファの内容をコマンドの標準入力に送るかどうか。送るなら
`t` 、送らないなら `nil`

3. コマンドをリスト形式で返す*関数*。リストではなくて関数であることに注
意。関数とすることで一時ファイル名などの設定ができ、より柔軟な設定が可
能です。


## というわけで

Warpの紹介でした。個人的にはElispでまとまった量のコードを書くのは初め
てだったんですが、いろいろなソースコードを拝見しながら慣れていきました。
Elisp開発者の方々に多謝です。

あと、ウェブページとエディタがウェブソケットで通信することでいろいろな
ことができそうだなー、と思いました。ウェブソケットサーバを立てるのも
Node.jsなら簡単だし。
[swank.js](http://e-arrows.sakura.ne.jp/2011/06/connect-to-nodejs-and-chrome-from-emacs.html)
とか究極的かもですね。

ではでは、Happy Editing!
