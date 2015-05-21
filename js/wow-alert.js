    ;
    (function ($) {


        var defaults = {
            labelOk:  "Ok",
            labelYes: "Sim",
            labelNo:  "Não",
            autoClose: true
        };

        jQuery.fn.extend({
            halfWidth: function () {
                var width = 0;
                this.each(function () {
                    width += $(this).outerWidth() / 2;
                });
                return width;
            },
            halfHeight: function () {
                var height = 0;
                this.each(function () {
                    height += $(this).outerHeight() / 2;
                });
                return height;
            }
        });
        function centerWindow() {
            this._alertWindow.css({
                marginLeft: -this._alertWindow.halfWidth(),
                marginTop: -this._alertWindow.halfHeight()
            });
        }

        function createWindow(type, msg) {
          var elements = ""
          if(type == "confirm") {
            elements = $("<div class='wow-alert-overlay'></div><div class='wow-alert-content'><p>" +
                        msg +
                        "</p><div class='wow-alert-buttons'><a id='false' href='#'>" +
                        this.options.labelNo +
                        "</a><a id='true' href='#'>" +
                        this.options.labelYes +
                        "</a></div></div>");
          } else {
            elements = $("<div class='wow-alert-overlay'></div><div class='wow-alert-content'><p>" +
                        msg +
                        "</p><div class='wow-alert-buttons'><a id='ok' href='#'>" +
                        this.options.labelOk +
                        "</a></div></div>");
          }

          this._alertOverlay = $(elements[0]);
          this._alertWindow = $(elements[1]);

          this._actionButtonOk = this._alertWindow.find('a#ok');
          this._actionButtonNo = this._alertWindow.find('a#false');
          this._actionButtonYes = this._alertWindow.find('a#true');

          this._alertOverlay.appendTo("body");
          this._alertWindow.appendTo("body");

          return [this._alertOverlay, this._alertWindow];
        }

        function configureActions() {
            var context = this;
            var bindable = function(e, ret) {
              e.preventDefault();
              if (context.options.autoClose) close();
              if (context.options.callback) context.options.callback();
            }

            this._actionButtonOk.bind('click', function (e) {
              bindable(e)
            });

            this._actionButtonYes.bind('click', function (e) {
              bindable(e, true)
            });

            this._actionButtonNo.bind('click', function (e) {
              bindable(e, false)
            });
        }

        function close() {
            this._alertOverlay.remove();
            this._alertWindow.remove();
        }
        window.confirm = function (msg, opts) {
            window.event.preventDefault()
            this.options = $.extend(defaults, opts);
            createWindow("confirm", msg);
            centerWindow();
            configureActions();
        }

        window.alert = function (msg, opts) {
            window.event.preventDefault()
            this.options = $.extend(defaults, opts);
            createWindow("alert", msg);
            centerWindow();
            configureActions();
        }

    }(jQuery));
