angular.module('common.components').controller('TreeViewCtrl', [
  '$scope', '$mdDialog', 'general', 'safeApply',
  function ($scope, $mdDialog, general, safeApply) {
    var self = this;
    self.selected = {};
    self.selectedParent = {};
    self.selectedHeader = {};
    self.init = function () {};

    //TODO: To Call API To Add New
    self.add = function (ev) {
      $mdDialog.show({
        controller: 'TreeviewDialogCtrl as dtc',
        templateUrl: 'app/core/components/sundew-tree.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(function (result) {

        switch (result.selected) {
          case "module":
            self.pDataSource.push({
              name: "Untitled Module",
              icon: "lens",
              type: "module",
              priority: self.pDataSource.length
            });
            break;
          case "toggle":
            if (self.selected && self.selected[0] && self.selected[0].type === 'module') {
              if (!self.selected[0].children)
                self.selected[0].children = [];

              self.selected[0].children.push({
                name: "Untitled Toggle",
                icon: "lens",
                type: "toggle",
                priority: self.selected[0].children.length
              });
            } else {
              general.warn("Please Select Module !");
            }
            break;
          case "link":
            ///TODO: To Check Index Menu, Can Create link with just module
            if (self.selected && self.selected[0] && (self.selected[0].type === 'module' ||
                self.selected[0].type === 'toggle')) {
              if (!self.selected[0].children)
                self.selected[0].children = [];

              self.selected[0].children.push({
                name: "Untitled Link",
                icon: "lens",
                type: "link",
                priority: self.selected[0].children.length
              });
            } else {
              general.warn("Please Select Module Or Title!");
            }
            break;
        }
      }, function () {}).finally(function () {

      });
    };

    //TODO: Edit
    self.edit = function () {
      console.log(self.pDataSource);
    };

    //TODO: To Call API To Delete
    self.delete = function (ev) {
      if (self.selected && self.selected[0]) {
        general.confirmation(null, "Sundew Tree",
          general.formatString("Are you sure to delete {0}", self.selected[0].name), "Delete", "Cancel",
          function () {

            var idx;
            var arr;
            if (self.selectedParent) {
              idx = self.selectedParent.children.indexOf(self.selected[0]);
              self.selectedParent.children.splice(idx, 1);
              arr = self.selectedParent.children;
            } else {
              idx = self.pDataSource.indexOf(self.selected[0]);
              self.pDataSource.splice(idx, 1);
              arr = self.pDataSource;
            }

            var pri = self.selected[0].priority;
            angular.forEach(arr, function (value, key) {
              if (arr[arr.indexOf(value)].priority > pri) {
                arr[arr.indexOf(value)].priority -= 1;
              }
            });
          },
          function () {}, ev);
      } else {
        general.warn("Please Select To Delete !");
      }
    };

    //TODO: To Call API To Update
    self.up = function () {
      self.RearrangePriority(-1);
    };

    //TODO: To Call API To Update
    self.upOnLvl = function () {
      self.Rellocate(-1);
    };

    //TODO: To Call API To Update
    self.downOnLvl = function () {
      self.Rellocate(1);
    };

    //TODO: To Call API To Update
    self.down = function () {
      self.RearrangePriority(1);
    };

    self.RearrangePriority = function (action) {
      if (!self.selected || !self.selected[0])
        return;

      var arr = [];
      if (self.selectedParent) {
        arr = self.selectedParent.children;
      } else {
        arr = self.pDataSource;
      }

      var idx = Number(self.selected[0].priority);
      var idxother;

      if (action < 0) {
        if (idx - 1 < 0) {
          return;
        }
        idxother = idx + action;
      } else {
        if (idx + 1 >= arr.length) {
          return;
        }

        idxother = idx + action;
      }

      angular.forEach(arr, function (value, key) {
        if (value.priority == idxother) {
          arr[arr.indexOf(value)].priority = idx;
          return;
        }
      });

      arr[arr.indexOf(self.selected[0])].priority = idxother;
      self.selected = [];

      self.pDataSource = self.pDataSource;
    };

    self.RellocateUp = function (arr) {
      //Remove From Parent
      arr.splice(arr.indexOf(self.selected[0]), 1);
      //Rearrange Parent Children
      var pri = self.selected[0].priority;
      angular.forEach(arr, function (value, key) {
        /*
        if (arr[arr.indexOf(value)].priority > self.selected[0].priority) {
          arr[arr.indexOf(value)].priority = pri;
          pri += 1;
        }*/

        if (arr[arr.indexOf(value)].priority > pri) {
          arr[arr.indexOf(value)].priority -= 1;
        }
      });

      var type;
      //Change Type
      if (self.selected[0].type == "link") {
        type = "toggle";
      } else {
        type = "module";
      }

      self.selected[0].type = type;
      if (self.selectedHeader) {
        //Reassign priority
        self.selected[0].priority = self.selectedHeader.children.length;
        self.selectedHeader.children.push(self.selected[0]);
      } else {
        //Reassign priority
        self.selected[0].priority = self.pDataSource.length;
        self.pDataSource.push(self.selected[0]);
      }
    };

    self.RellocateDown = function (arr) {
      if (self.selected[0].type == "module") {
        type = "toggle";
      } else if (self.selected[0].type == "toggle") {
        type = "link";
      } else {
        return;
      }
      self.selected[0].type = type;

      var nextObj = general.filterArray(self.selectedParent.children, function (item) {
        return item.priority === self.selected[0].priority + 1;
      });

      //Remove From Parent
      arr.splice(arr.indexOf(self.selected[0]), 1);
      //Rearrange Parent Children
      var pri = self.selected[0].priority;

      if (nextObj) {
        if (nextObj.type != "link") {
          if (!nextObj.children)
            nextObj.children = [];

          //Set Newly Inserted Priority
          self.selected[0].priority = nextObj.children.length;
          nextObj.children.push(self.selected[0]);
        }
      }

      //Rearrange Parent Children
      angular.forEach(arr, function (value, key) {
        if (arr[arr.indexOf(value)].priority > pri) {
          arr[arr.indexOf(value)].priority -= 1;
        }
      });
    };

    self.Rellocate = function (action) {
      if (self.selectedHeader === undefined) {
        general.warn(general.formatString("Header Can't {0} Level.", action < 0 ? "Up" : "Down"));
        return;
      }

      if (!self.selected || !self.selected[0])
        return;

      var arr = [];
      if (self.selectedParent) {
        arr = self.selectedParent.children;
      } else {
        arr = self.pDataSource;
      }

      if (action < 0) {
        self.RellocateUp(arr);
      } else {
        self.RellocateDown(arr);
      }

      self.pDataSource = self.pDataSource;
    };

    //Get Parent Tree Node
    self.treeClick = function (header, parent, child) {
      self.selectedParent = parent;
      self.selectedHeader = header;
    };

    self.init();
  }
]);