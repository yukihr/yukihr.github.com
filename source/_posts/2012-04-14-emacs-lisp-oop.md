---
layout: post
title: "Emacs Lisp でオブジェクト指向"
date: 2012-04-14 02:05
comments: true
categories: Emacs
---
Elisp でオブジェクト指向プログラミング（OOP）を実現する方法について調べためも。
ある程度の量のコードを書くならやはり慣れたOOPが便利ということで。

<!-- more -->

## 基本

* [On Lisp - オブジェクト指向Lisp](http://www.asahi-net.or.jp/~kc7k-nd/onlispjhtml/objectOrientedLisp.html)

    * 素のLisp(Common Lisp)でもOOPできるよ(ELispでも同じように出来るかどうかは確かめてないです・・)。
    * [CLOS](http://ja.wikipedia.org/wiki/Common_Lisp_Object_System)っていう規格でlispでも柔軟なOOPできるよ。


## ライブラリ

* クラスベースのOOPには [EIEIO](http://cedet.sourceforge.net/eieio.shtml)
   * CLOS のサブセットを提供するもの

* プロトタイプベースのOOPには  [eon.el](http://www.mail-archive.com/gnu-emacs-sources@gnu.org/msg01190.html)
   * あまり使用例がなさそう(http://d.hatena.ne.jp/rubikitch/20070922/eon)

## 余談

調べてたときに見つけた [あるOOPLな会話](http://sumim.no-ip.com:8080/wiki/748) がおもしろかたー
