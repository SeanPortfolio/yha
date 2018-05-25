var customSelect = function(w, d, $){
  
  var defaults = {
    block: 'custom-select'
  };
  
  var customSelect = function(){
    
    var customSelect = function(selector, options) {
      
      this.selector               = selector;
      
      this.options                = options;
      
      this.activeModifier         = this.options.block + '--active';
      
      this.optionModifier         = 'custom-select__option';
      
      this.optionSelectedModifier = 'custom-select__option' + '--selected';
      
      this.init();
      
    };
    
    return customSelect;
    
  }();
  
  var proto = customSelect.prototype;
  
  proto.init = function() {
    
    var $this = this;
    
    $this.el         = $($this.selector);
    
    $this.opts       = [];
    
    $this.attrs      = {};
    
    $this.block      = $this.el.attr('class');
    
    $this.attrs.name = $this.el.attr('name');
    
    $this.attrs.id   = $this.el.attr('id');
    
    // CREATE AN ARRAY OF OPTIONS
    
    $this.el.find('option').each(function(i, option) {
      
      var jOption = $(option);
      
      $this.opts.push({
        label: jOption.text(),
        value: jOption.val(),
        isSelected: jOption.is(":selected")
      });
    });
    
    $this.generateView();
    
  };
  
  
  proto.generateView = function() {
    
    var $this = this;
    
    var optionsView   = '';
    
    var selectedValue = '';
    
    var selectedLabel = '';
    
    for (var i = 0; i < $this.opts.length; i++) {
      var isSelected = ($this.opts[i].isSelected === true);
      
      var selectedCls = (isSelected) ? 
        ' ' + $this.optionSelectedModifier : 
        '';
        
      if (isSelected) {
        
        selectedValue = $this.opts[i].value;
        
        selectedLabel = $this.opts[i].label;
      }
      
      optionsView += '<li class="custom-select__option'+selectedCls+'" data-label="'+
        $this.opts[i].label+'" data-value="'+$this.opts[i].value+'">'+
        $this.opts[i].label+'</li>';
      
    }
    
    var view = '<div class="custom-select '+$this.block+'">'+
      '<span class="custom-select__label">'+selectedLabel+'</span>'+
      '<ul class="custom-select__dropdown">'+
      optionsView+
      '</ul>'+
      '<input type="hidden" class="custom-select__input" '+
      'name="'+$this.attrs.name+'" id="'+$this.attrs.name+'" value="'+selectedValue+'">'+
    '</div>';
    
    $this.el.removeAttr('name id').hide();
    
    $this.el.after(view);
    
    $this.toggleDropdown();
    
    $this.selectOption($this.el.siblings('.custom-select'));
    
  };
  
  proto.toggleDropdown = function() {
    
    var $this = this,
        el    = $this.el.siblings('.'+$this.options.block);
    
    el.on('click', function(e){
      
      var self = $(this);

      self.toggleClass($this.activeModifier);
    });
  
  };
  
  proto.selectOption = function(el) {
    
    var $this = this;
    
    el.on('click', '.' + $this.optionModifier, function(e){
      
      e.preventDefault();
      e.stopPropagation();
      
      var self = $(this),
          label = self.data('label'),
          value = self.data('value'),
          parent = el;
        
      if (!self.hasClass($this.optionSelectedModifier)) {
        
        parent.find('.' + $this.optionModifier)
        .removeClass($this.optionSelectedModifier);
        
        self.addClass($this.optionSelectedModifier);
        
        parent.find('.custom-select__label').text(label);
        parent.find('.custom-select__input').val(value);
        parent.removeClass($this.activeModifier);
        
      }
      
    });
    
    // $(d).click(function(e){
    //   e.stopPropagation();
    //   $('.'+$this.options.block).removeClass($this.activeModifier);
    // 
    // });
    
  };
  
  $.fn.customSelect = function(options) {
    
    options = $.extend(true, defaults, options);
    
    $(this).each(function(i, elm){
      new customSelect(this, options);
    });
    
    return this;
  };
  
}(window, document, jQuery);