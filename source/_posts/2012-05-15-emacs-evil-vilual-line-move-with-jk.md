---
layout: post
title: "Emacs Evil で物理行移動"
date: 2012-05-15 21:02
comments: true
categories: [Emacs, Vim]
---
Emacs では、Vimのようなモードによる操作を実現するVimpulseを使っていたんですが、Vimpulse後継のEvilが開発されているのをSoftware Design誌の記事で知り最近乗り換えました。

<!-- more -->

Evilではデフォルトでjkでの移動が論理行移動に設定されています。これを物理行移動にする設定が用意されてないのかなー、とソースを探索していたところ `evil-next-visual-line`, `evil-previous-visual-line` というコマンドが定義されているのを見つけました。これらはデフォルトでは、`gj`, `gk`のキーに設定されています。これを `j`, `k`に設定するには以下のようにします。

{% gist 2701180 %}


(2013/3/4 追記)

evilコミッタであるid:taraoさんがこの設定についてよりスマートな方法を書かれていますので、今後設定される方はこちらの方を参考にされるといいと思います。

[物理行移動と論理行移動を入れ替え](http://d.hatena.ne.jp/tarao/20130304/evil_config#misc-physical-line)
