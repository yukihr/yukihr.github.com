---
layout: post
title: "Emacs + Xcode4.5 iOSアプリ開発設定"
date: 2012-11-01 17:12
comments: true
categories:  [Emacs, iOS, Xcode]
---

EmacsとXcode4.5でiOSアプリを開発をするための設定です。ウェブ上にEmacs + Xcodeで開発するための設定は色々とあるんですが、Xcode側の変更によってが動作するものが少なかった(特にFlymakeと補完)のでまとめておきたいと思います。実際の開発作業ではXcodeもEmacsと別に起動しておいて、必要に応じて切り替えて使っています。

* obj-c-modeでソースファイルを開く

{% gist 3991026 ios-auto-mode.el %}


* ヘッダと実装ファイルをジャンプする(C-c t)

{% gist 3991026 ios-jump-header.el %}


* カーソル下の単語または選択範囲をXcodeのオーガナイザで検索する(C-c r)

{% gist 3991026 ios-search-doc.el %}


* SDKのパス設定

  FlymakeとAutocompleteの設定に利用します。

{% gist 3991026 ios-sdk-settings.el %}
  

* Autocompleteによる補完設定

  別途[auto-complete-clang.el](https://github.com/brianjcj/auto-complete-clang)をダウンロードし、elispのインストールディレクトリに置いておきます。

{% gist 3991026 ios-auto-complete.el %}

  三行目の設定をauto-complete-clang.elを置いたパスで置き換えてください。

  
* Flymake

{% gist 3991026 ios-flymake.el %}

  26行目からの箇所では、コンパイラのclangがExit Code = 1で終了する（オプションを変更すればExitCode=0で終了させられるかもしれません・・）ことでFlymakeがエラーになってしまうことに対処しています。この設定によってFlymakeがコマンドの異常終了を拾わなくなり、他の言語の設定に影響があるかもしれないので注意してください。
  
本ページの設定については以下のページを参考にさせていただきました。ありがとうございました！

* [Emacs で iPhone アプリ開発を快適にするための設定](http://sakito.jp/emacs/emacsobjectivec.html)
* [Jump to the documentation search field in Xcode 4 using AppleScript.](https://gist.github.com/2500847)
* [clangを使ったCのコード補完](http://ponpoko1968.hatenablog.com/entry/20101030/1288395400)
* [[Objective-C in Emacs] Check the syntax in flymake](http://blog.fenrir-inc.com/us/2012/04/objective-c-in-emacs-check-the-syntax-in-flymake.html)
* [Emacs for Xcode+ios Development](http://roupam.github.com/)

でわー！
